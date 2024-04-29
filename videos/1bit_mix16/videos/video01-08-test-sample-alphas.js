/*    video01-08-test-sample-alphas - form 1bit_mix16 in videoground-samp-waveform
 *        * testing out samp_alphas.js R0
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
    sm.renderer.setClearColor(0x000000, 0.25);


    console.log( Samp_alphas.linear(-2, 10, 1, true) );             //  0.8
    console.log( Samp_alphas.linear(-2, 10, 1, false) );            // -0.2
    console.log( Samp_alphas.linear(Math.abs(-2), 10, 1, false) );  //  0.2
    console.log( Samp_alphas.sin(7.5, 10, 0.5, false) );  //  0.9238795325112867

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 3,
        objects: [
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'pulse-cell-second',
                samp: {
                    duty: 0.5,
                    frequency: 2
                }
            },
            {
                waveform: 'noise_1bit',
                mode: 'tone',
                desc: 'noise-cell-frame',
                samp: {
                    frequency: 1,
                    alow:0, ahigh:1,
                    seed_delta: 100
                }
            },
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'pulse-range',
                samp: {
                    frequency: 0
                }
            },
        ]
    });

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            Bit_tracks.new_frame(sud.tracks, a_sound2);

            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
        
            const sec_alpha = Samp_alphas.cell(i, 44100, 0);
            const frame_alpha = Samp_alphas.cell(i, 1470, 0);

            const samp0 = sud.tracks.objects[0].samp;
            samp0.frequency = (60 + 300 * sec_alpha) / 30;
            
            
            
            const samp1 = sud.tracks.objects[1].samp;
            samp1.frequency = 1;
            samp1.alow = 0.45 * a_sound;
            samp1.ahigh = 1 - 0.45 * a_sound;
            samp1.seed_start = 1000 * a_sound;
            samp1.seed_delta = 100;


            const samp2 = sud.tracks.objects[2].samp;
            const r1_alpha = Samp_alphas.range( i, Math.floor(opt.i_size * 0.05), Math.floor(opt.i_size * 0.25) );
            const r2_alpha = Samp_alphas.range( i, Math.floor(opt.i_size * 0.50), Math.floor(opt.i_size * 0.90) );
            const a1 = ST.get_alpha_sin(r1_alpha, 1, 1);
            const a2 = ST.get_alpha_sin(r2_alpha, 1, 1);


            samp2.frequency = 0;

            if(a1 > 0){
                samp2.frequency = 16 * a1;
            }
            if(a2 > 0){
                samp2.frequency = 32 * a2;
            }

            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, frame_alpha );
        },
        secs: 20
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

