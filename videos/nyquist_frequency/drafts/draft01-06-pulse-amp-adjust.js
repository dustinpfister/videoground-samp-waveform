/*    draft01-06-pulse-amp-adjust - form nyquist_frequency project in videoground-samp-waveform repo
 *      
 *    https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/nyquist_frequency
 *
 *    * with this one I tried out just reducing amplitude during the start and end of updates
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

    sud.TOTAL_SECS = 30;

    // updated pulse waveform function for nyquist_frequency project
    const pulse_cp = (samp, a_wave) => {
        const duty = samp.duty === undefined ? 0.5 : samp.duty;
        const max_points = samp.max_points === undefined ? 100000 : samp.max_points;
        const a_cycle = samp.frequency * a_wave % 1;
        const cycle_points = Math.round( a_cycle * max_points) % max_points;
        const a_cp = cycle_points / max_points;
        if(a_cp >= duty){
            return samp.amplitude * 1;
        }
        return samp.amplitude * -1;
    };

    // updated sin waveform function for nyquist_frequency project
    const sin_cp = (samp, a_wave) => {
        const max_points = samp.max_points === undefined ? 1000000: samp.max_points;
        const a_cycle = samp.frequency * a_wave % 1;
        const cycle_points = Math.round( a_cycle * max_points) % max_points;
        const a_cp = cycle_points / max_points;
        return Math.sin( Math.PI * 2 * a_cp ) * samp.amplitude;
    };

    const sound = sud.sound = CS.create_sound({
        waveform : pulse_cp,
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
        
            const sample_rate = opt.sound.sample_rate;

            const update_count = 699;

            const i_update = Math.floor(update_count * a_sound);
            const a_update = update_count * a_sound % 1;

            let spc = sud.samples_per_cycle = 700 - i_update;
            
            samp.frequency = sud.frequency = 0;
            samp.amplitude = 0.00;
            if(spc > 0){
                samp.frequency = sud.frequency = sample_rate / spc;
                //samp.amplitude = Samp_alphas.sin(a_update, 1, 1)
                const amp = 1;
                samp.amplitude = amp;
                if(a_update < 0.025){
                    samp.amplitude = a_update / 0.025 * amp; 
                }
                if(a_update >= 0.975){
                    samp.amplitude = amp - ( a_update - 0.975 ) / 0.025 * amp; 
                }
            }

            //!!! this gives me 0 to 1 values, but I get a distortion every second
            samp.a_wave = a_sound * opt.secs;


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

