/*    draft01-07-pulse-int-array - form nyquist_frequency project in videoground-samp-waveform repo
 *      
 *    https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/nyquist_frequency
 *
 *    * trying out just an array of int values for spc
 *    * This may be silly, but I can just have a custom set of spc values, and also use Array methods like filter
 *
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
    '../../../js/samp_create/r0/samp_tools.js',
    '../../../js/samp_create/r0/samp_create.js',
    '../../../js/samp_debug/r0/samp_debug.js',
    '../../../js/samp_alphas/r0/samp_alphas.js',
    '../../../js/export_done/r0/export_done.js',
    '../js/nyquist_waveforms.js',
    '../js/nyquist_draw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    sud.samples_per_cycle = 0;
    sud.frequency = 0;
    sud.data_samples = [];
    sud.TOTAL_SECS = 60;
    
    sud.sample_rate = 44100;


/*
    sud.spc_arr = [
        85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 
        71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58,
        57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44,
        43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30,
        29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 
        15, 14, 13, 12, 11, 10,  9,  8,  7,  6,  5,  4,  3,  2    
    ];
*/

    // can create an array with a loop
    sud.spc_arr = [];
    let spc = 1470;
    while(spc >= 2){
        sud.spc_arr.push(spc);
        spc -= 1;
    }
    // filter all spcs that will result in fractions
    sud.spc_arr = sud.spc_arr.filter( (spc) => {
        return sud.sample_rate / spc % 1 === 0;
    });


    //sud.spc_arr = '84,75,70,63,60,50,49,45,42,36,35,30,28,25,21,20,18,15,14,12,10,9,7,6,5,4,3,2'.split(',').map((str)=>{return parseInt(str);})

    const sound = sud.sound = CS.create_sound({
        waveform : Nyquist_waveforms.pulse_cp,
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            let spc = sud.samples_per_cycle = sud.spc_arr[ Math.floor( sud.spc_arr.length * a_sound ) ];
            samp.frequency = sud.frequency = sud.sample_rate / spc;
            samp.amplitude = 0.50;
            samp.a_wave = a_sound * opt.secs % 1;
            return samp;
        },
        secs: sud.TOTAL_SECS
    });

    sud.opt_frame = { w: 1200, h: 420, sy: 150, sx: 40, mode: sound.mode, overlay_alpha: 0.5 };
    sm.frameMax = sound.frames;
};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){
    const sud = scene.userData;
    // create the data samples
    sud.data_samples = CS.create_frame_samples(sud.sound, sm.frame, sm.frameMax );

    if(sm.isExport){
        return CS.write_frame_samples(sud.sound, sud.data_samples, sm.frame, sm.imageFolder, sm.isExport)
        .then( () => {
            return CDB.write_text_samples(sud.data_samples, sm.frame, sm.imageFolder  );
        });
    }
};
//-------- ----------
// RENDER
//-------- ----------
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
    Nyquist_draw.background(ctx, canvas);
    Nyquist_draw.info(ctx, scene.userData, sm);
    Nyquist_draw.samples(ctx, scene.userData.data_samples);
};
//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};

