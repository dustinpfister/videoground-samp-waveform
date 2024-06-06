/*    draft02-04-sin-reduce - form nyquist_frequency project in videoground-samp-waveform repo
 *      
 *    https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/nyquist_frequency
 *
 *    * working out a new system that has to do with cycle_count, and samples_per_cycle
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

    sud.SAMPLE_COUNT_START = 1470;

    let i_pointer = 0;
    let sample_count = sud.SAMPLE_COUNT_START;

    // sound object
    const sound = sud.sound = CS.create_sound({
        waveform : (samp, a_wave) => {
            const a = a_wave % 1;
            return Math.sin( Math.PI * 2 *  a ) * -1;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {

            if(i === 0){
                i_pointer = 0;
                sample_count = sud.SAMPLE_COUNT_START;
            }

            const i2 = i - i_pointer;

//console.log(i2)

            if( i2 === sample_count){

                i_pointer += sample_count;
                if(sample_count > 2){
                    sample_count -= 1;
                }
            }


            samp.a_wave = i2 % sample_count / sample_count;
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
};
//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};

