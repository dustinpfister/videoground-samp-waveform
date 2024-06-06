/*    draft02-03-sin-cycle-alpha - form nyquist_frequency project in videoground-samp-waveform repo
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

    sud.freq1 = 0;
    sud.freq2 = 0;


    const get_freq = (cycle_count, tone_sc ) => {
        return cycle_count * ( 1470 / tone_sc   ) * 30;
    };

    // sound object
    const sound = sud.sound = CS.create_sound({
        waveform : (samp, a_wave) => {
            const a = (samp.a_shift + a_wave) % 1;
            return Math.sin( Math.PI * 2 *  a ) * -1;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {

            const tone_sc = 1470;
            const cycle_start = 1;
            const cycle_end = 736;

            const tone_count = opt.i_size / tone_sc;
            const tone_index = Math.floor( i / tone_sc);
            const tone_a1 = i % tone_sc / tone_sc;
            const tone_a2 = tone_index / tone_count;
            const cycle_count_frac = cycle_start + ( cycle_end - cycle_start) * tone_a2;
            const cycle_count = Math.floor(cycle_count_frac);
            const a_cycle = cycle_count * tone_a1 % 1;
            const i_cycle = Math.floor(cycle_count * tone_a1);

            samp.a_wave = a_cycle;
            samp.a_shift = 0.25;

            if(i %  1470 === 0){
                sud.freq1 = get_freq(cycle_count, tone_sc);
            }
            if(i %  1470 === 1469){
                sud.freq2 = get_freq(cycle_count, tone_sc);
            }

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
    //Nyquist_draw.info(ctx, sud, sm);

    ctx.fillStyle = 'white';
    ctx.font = '30px courier';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';


    const pad_freq = (freq) => {
        return String( Math.floor(freq) ).padStart(5, 0);
    };

    //if(sud.freq1 === sud.freq2){
    //    ctx.fillText( sud.freq1 + ' hertz', 10, 10 );
    //}

    //if(sud.freq1 != sud.freq2){
        ctx.fillText( pad_freq(sud.freq1) + ' to ' + pad_freq(sud.freq2) + ' hertz', 10, 10 );
    //}

    Nyquist_draw.samples(ctx, scene.userData.data_samples);
};
//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};

