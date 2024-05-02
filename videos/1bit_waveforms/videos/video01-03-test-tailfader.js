/*    video01-03-test-tailfader - form 1bit_waveforms in videoground-samp-waveform 
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_alphas/r0/samp_alphas.js',
  '../../../js/samp_debug/r0/samp_debug.js',
  '../../../js/bit_tracks/r2/bit_tracks.js',
  '../../../js/bit_tracks/r2/bit_samp_draw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
   
    const sud = scene.userData;

    // tailfader
    const tailfader_1bit = (samp, a_wave) => {
        const a_cycle = samp.frequency * a_wave % 1;
        const d1 = samp.d1 === undefined ? 0.50: samp.d1;
        const d2 = samp.d2 === undefined ? 0.50: samp.d2;
        const exp = samp.exp === undefined ? 4 : samp.exp;
        if(a_cycle < d1){
            const a_duty = a_cycle / d1;
            if(a_duty < d2){
                return 1;
            }
            if(a_duty >= d2){
                const a_tail = (a_duty - d2) / ( 1 - d2);
                if(Math.round( Math.pow(2, exp * a_tail) ) % 2 === 0){
                    return 1;
                }
            }
        }
        return 0;
    };

    // new pulse function
    const pulse_1bit = (samp, a_wave) => {
        const a_cycle = samp.frequency * a_wave % 1;
        const duty = samp.duty === undefined ? 0.50: samp.duty;
        if(a_cycle < duty){
            return 1;
        }
        return 0;
    };

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: tailfader_1bit,
                mode: 'tone',
                desc: 'tailfader',
                samp: {
                    amplitude: 1,
                    frequency: 90,
                    d1: 0.60,
                    d2: 0.25,
                    exp: 3.85
                }
            },
            {
                waveform: pulse_1bit,
                mode: 'tone',
                desc: 'pulse',
                samp: {
                    amplitude: 1,
                    frequency: 90,
                    duty: 0.60
                }
            }
        ]
    });

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            const samp0 = sud.tracks.objects[0].samp;
            const samp1 = sud.tracks.objects[1].samp;

            samp0.exp = 3;
            samp0.d2 = 0.25;

            if(a_sound2 >= 0.00 && a_sound2 < 0.10){
                samp0.amplitude = 1;
                samp1.amplitude = 0;

            }

            if(a_sound2 >= 0.10 && a_sound2 < 0.20){
                samp0.amplitude = 0;
                samp1.amplitude = 1;

            }

            if(a_sound2 >= 0.20 && a_sound2 < 0.50){
                const a = ( a_sound2 - 0.20 ) / 0.30;
                const n = Math.round( 16 *  a);
                samp0.amplitude = n % 2 === 0 ? 1 : 0;
                samp1.amplitude = n % 2 === 0 ? 0 : 1; 

            }

            if(a_sound2 >= 0.50 && a_sound2 < 0.75){
                const a = ( a_sound2 - 0.50 ) / 0.25;
                samp0.amplitude = 1;
                samp0.exp = 6 * a;
                samp1.amplitude = 0;

            }

            if(a_sound2 >= 0.75 && a_sound2 < 1.00){
                const a = ( a_sound2 - 0.75 ) / 0.25;
                samp0.amplitude = 1;
                samp0.exp = 6;
                samp0.d2 = 0.25 + 0.70 * a;
                samp1.amplitude = 0;
            }

            Bit_tracks.new_frame(sud.tracks, a_sound2);
            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const sec_alpha = Samp_alphas.cell(i, 44100, 0);
            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, sec_alpha );
        },
        secs: 30
    });

    // display objects for audio sample arrays for tracks and main final display
    sud.track_disp_opt = DSD.create_disp_options(sud.tracks, sound, { line_width: 3, midline_style: '#444400' });
    // set vg sm.frameMax to frames value of sound object
    sm.frameMax = sound.frames;
};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){
    const sud = scene.userData;
    const data_samples = CS.create_frame_samples(sud.sound, sm.frame, sm.frameMax );
    return CS.write_frame_samples(sud.sound, data_samples, sm.frame, sm.imageFolder, sm.isExport);
};
//-------- ----------
// RENDER
//-------- ----------
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
    const sud = scene.userData;
    const sound = sud.sound;
    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    // draw sample data for 1bit tracks, and 16bit mix
    DSD.draw_tracks(ctx, sud.tracks, sud.track_disp_opt);
    DSD.draw( ctx, sound.array_frame, sud.track_disp_opt.mix, sm.per, 'final 16-bit mix' );
    // top display info
    DSD.draw_info(ctx, sound, sm, '#ffffff', 30);
};

