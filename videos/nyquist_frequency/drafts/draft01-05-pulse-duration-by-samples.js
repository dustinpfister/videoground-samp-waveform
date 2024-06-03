/*    draft01-05-pulse-duration-by-samples - form nyquist_frequency project in videoground-samp-waveform repo
 *      
 *    https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/nyquist_frequency
 *
 *    * if I work out a way to set the duration of the video by samples needed that should help with the freq fraction problem 
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
  '../../../js/samp_create/r0/samp_draw.js',
    '../../../js/export_done/r0/export_done.js'
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


/*
    const samp_data = [
        [30, 1470, 0, 0],
        [29, 1470, 0, 9],
        [28, 1470, 0, 24]

    ];
*/

    const spc_start = 100;
    const spc_changes = spc_start - 1;
    const samp_data = [];
    let i_sd = 0;
    while(i_sd < spc_changes){
        let spc = spc_start - 1 * i_sd;
        const samp_count = Math.ceil(15000 / spc) * spc;

        //const samp_count = spc * 100;

        samp_data.push([spc, samp_count, 0, 0]);
        i_sd += 1;
    }


    let t = 0, i_samp = 0;
    samp_data.forEach( (opt_samp) => {
        i_samp += opt_samp[1];
        opt_samp[2] = i_samp;
        t += opt_samp[1] / 44100;
    });

    console.log(t);

    sud.TOTAL_SECS = Math.ceil(t);

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

            // one way or another I need to set the current object in samp_data
            let opt_samp = [0, 0, 0, 0];
            let i_obj = 0;
            const len = samp_data.length;
            while(i_obj < len){
                const a = samp_data[i_obj];
                if(i < a[2]){
                    opt_samp = samp_data[i_obj];
                    break; 
                }
                i_delta = a[2];
                i_obj += 1;
            }

            if(i % 1470 === 0){
                //console.log(opt_samp);
            }

            let spc = opt_samp[0];
            
            samp.frequency = sud.frequency = 0;
            samp.amplitude = 0.00;
            if(spc > 0){
                samp.frequency = sud.frequency = sample_rate / spc;
                samp.amplitude = 0.45;
            }

            //!!! this gives me 0 to 1 values, but I get a distortion every second
            //samp.a_wave = a_sound * opt.secs % 1;


            //!!! this works, but now I no longer have - 0 to 1 values
            //samp.a_wave = a_sound * opt.secs;

            let samp_delta = opt_samp[3];
            //const a = samp_data[i_obj - 1];
            //if(a){
               //samp_delta = 24;
            //}
            samp.a_wave = (i + samp_delta ) % 44100 / 44100;


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
    const sud = scene.userData;
    const sound = sud.sound;

    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // text info - freq and samp per sec
    const text_info = '' + 
        ' frequency: ' + sud.frequency.toFixed(2).padStart(3 + 5, 0) +
        ' samples_per_cycle: ' + sud.samples_per_cycle.toFixed(4)       
    ctx.fillStyle = 'white';
    ctx.font = '30px  courier';
    ctx.textBaseline = 'top';
    ctx.fillText(text_info,10,10);

    // text info - freq and samp per sec
    const text_info2 = '' +
        ' frame: ' + String(sm.frame).padStart(String(sm.frameMax).length, '0') + '/' + sm.frameMax;
    ctx.fillText(text_info2, 10, 40);


    // data samples
    const len = sud.data_samples.length;
    const i_delta = len / 10;
    let i_slice = 0;
    while(i_slice < 10){
        const i_start = i_delta * i_slice;
        const i_end = i_start + i_delta;
        const slice1 = sud.data_samples.slice(i_start, i_end);
        slice1.forEach( (sample, i) => {

            const n = ST.mode_to_raw(sample, 'int16');

            const a = 0.01 - 0.99 * n;
            const x = 10 + (i * 8.5);
            my = 120 + 60 * i_slice;

            const sy = my;
            const ey = my + 25 * a;
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            ctx.moveTo(x, sy);
            ctx.lineTo(x, ey);
            ctx.closePath();
            ctx.stroke();
        
        });
        i_slice += 1;
    }

};

//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};

