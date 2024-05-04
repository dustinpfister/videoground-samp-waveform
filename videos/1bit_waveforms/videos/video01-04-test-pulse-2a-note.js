/*    video01-04-test-pulse-2a-note - form 1bit_waveforms in videoground-samp-waveform
 *        
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

    // new pulse function
    const pulse_2a_note_1bit = (samp, a_wave) => {
        const d1 = samp.d1 === undefined ? 0.25 : samp.d1;
        const d2 = samp.d2 === undefined ? 0.75 : samp.d2;
        const a_note = samp.a_note === undefined ? 1 : samp.a_note;
        const a_cycle = samp.frequency * a_wave % 1;
        const n1 = Math.min(d1, d2);
        const n2 = Math.max(d1, d2);
        const range = Math.abs(n2 - n1);
        if( a_note > 0 && a_cycle >= n1 + range / 2 * ( 1 - a_note )  && a_cycle <= n2 - range / 2 * ( 1 - a_note ) ){
            return 1;
        }
        return 0;
    };

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 1,
        objects: [
            {
                waveform: pulse_2a_note_1bit,
                mode: 'tone',
                desc: 'pulse_2a_note',
                samp: {
                    amplitude: 1,
                    frequency: 90,
                    d1: 0.15,
                    d2: 0.85,
                    a_note: 0.25
                }
            }
        ]
    });

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            const samp0 = sud.tracks.objects[0].samp;
            samp0.a_note = Samp_alphas.sin( a_sound2, 1, 1, true );

            Bit_tracks.new_frame(sud.tracks, a_sound2);
            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const sec_alpha = Samp_alphas.cell(i, 44100, 0);
            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, sec_alpha );
        },
        secs: 10
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

