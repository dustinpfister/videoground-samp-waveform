/*    draft02-05-sin-int - form nyquist_frequency project in videoground-samp-waveform repo
 *      
 *    https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/nyquist_frequency
 *
 *    * trying out a simple system again just to get a better idea of what is going on
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

    // sound object
    const sound = sud.sound = CS.create_sound({
        waveform : Nyquist_waveforms.sin_cp,
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const sample_rate = 44100;

            // set spc, then frequency?
            let spc = sud.samples_per_cycle = Math.round(1470 - 1468 * a_sound);
            samp.frequency = sud.frequency = sample_rate / spc;      
                        
            // setting frequnecy, then spc?
            //samp.frequency = sud.frequency = 30 + 10000 * a_sound;            
            //let spc = sud.samples_per_cycle = sample_rate / samp.frequency;
            
            samp.amplitude = 1.00;

            return samp;
        },
        secs: 30
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
    const sud = scene.userData;
    Nyquist_draw.background(ctx, canvas);
    Nyquist_draw.samples(ctx, scene.userData.data_samples);
    
    // text info - freq and samp per sec
    const text_info = '' + 
        ' frequency: ' + sud.frequency.toFixed(2).padStart(3 + 5, 0) +
        ' samples_per_cycle: ' + sud.samples_per_cycle.toFixed(4)       
    ctx.fillStyle = 'white';
    ctx.font = '40px  courier';
    ctx.textBaseline = 'top';
    ctx.fillText(text_info,10,10);
    
    
};
//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};

