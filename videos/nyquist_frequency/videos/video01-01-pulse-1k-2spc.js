/*    video01-01-pulse-1k-2 - form nyquist_frequency project in videoground-samp-waveform repo
 *      
 *    https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/nyquist_frequency
 *    
 *    * worked out a new pulse waveform that addresses some problems
 *    * started a new display that shows the state of each sample, for each frame
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
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

    // updated pulse waveform function for nyquist_frequency project
    const pulse_cp = (samp, a_wave) => {
        const duty = samp.duty === undefined ? 0.5 : samp.duty;
        const max_points = samp.max_points === undefined ? 100000 : samp.max_points;
        const a_cycle = samp.frequency * a_wave % 1;
        const cycle_points = Math.round( a_cycle * max_points) % max_points;
        const a_cp = cycle_points / max_points;
        if(a_cp >= duty){
            return -1 + samp.amplitude * 2;
        }
        return -1;
    };


    const sound = sud.sound = CS.create_sound({
        waveform : pulse_cp,
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
        
            const sample_rate = opt.sound.sample_rate;

            const spc_start = 1000;
            const alpha = Samp_alphas.sin(a_sound, 1, 0.5, true);

            let spc = Math.round(spc_start - (spc_start - 2) * alpha);
            
            

            const freq = sample_rate / spc;

            sud.frequency = samp.frequency = freq;
            sud.samples_per_cycle = sample_rate / freq;

            samp.amplitude = 0.65;
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

    return CS.write_frame_samples(sud.sound, sud.data_samples, sm.frame, sm.imageFolder, sm.isExport);
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
        ' frequency: ' + sud.frequency.toFixed(4) +
        ' samples_per_cycle: ' + sud.samples_per_cycle.toFixed(4);        
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
            const a = 0.01 + 0.99 * (n + 1) / 2;

            const x = 10 + (i * 8.5);
            my = 120 + 60 * i_slice;

            const sy = my - 25 * a;
            const ey = my + 25 * a;

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'lime';

            ctx.beginPath();
            ctx.moveTo(x, sy);
            ctx.lineTo(x, ey);
            ctx.closePath();
            ctx.stroke();
        
        });

        i_slice += 1;
    }


    // draw frame disp, and info
    //DSD.draw( ctx, sound.array_frame, sud.opt_frame, 0, 'sample data ( current frame )' );
    //DSD.draw_info(ctx, sound, sm);
};

//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};

