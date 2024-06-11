/*    draft02-02-sin-arrfilter - form nyquist_frequency project in videoground-samp-waveform repo
 *      
 *    https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/nyquist_frequency
 *
 *    * based on video01-02-pulse-arr-filter.
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
    // scene use data object
    const sud = scene.userData;
    sud.SPC_START = 735;
    sud.SPC_END = 2;
    sud.samples_per_cycle = 0;
    sud.frequency = 0;
    sud.data_samples = [];
    sud.sample_rate = 44100;
    sud.amplitude = 0.75;
    
    // can create an array with a loop
    sud.spc_arr = [];
    let spc = sud.SPC_START;
    while(spc >= sud.SPC_END){
        sud.spc_arr.push(spc);
        spc -= 1;
    }

    // filter all spcs that will result in fractions
    sud.spc_arr = sud.spc_arr.filter( (spc) => { 
        return sud.sample_rate / spc % 1 === 0;
    });


    sud.TOTAL_SECS = sud.spc_arr.length * 1.0;

    // sound object
    const sound = sud.sound = CS.create_sound({
        waveform : Nyquist_waveforms.sin_cp,
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const i_arr = Math.floor( sud.spc_arr.length * a_sound );
            let spc = sud.samples_per_cycle = sud.spc_arr[ i_arr ];
            samp.frequency = sud.frequency = sud.sample_rate / spc;
            samp.amplitude = sud.amplitude;

            samp.max_points = 10000000;

            samp.a_cp_shift = a_sound * opt.secs * 0.50 % 1;
            samp.a_wave = a_sound * opt.secs  % 1;
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

