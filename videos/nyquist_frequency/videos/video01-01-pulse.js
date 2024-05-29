/*    video01-01-bassbasic-2xbeat - form bass_basic in videoground-samp-waveform 
          * just get the basic idea of the waveform working
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
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

    const sound = sud.sound = CS.create_sound({
        waveform : (samp, a_wave) => {
             const a_cycle = samp.frequency * a_wave % 1;

             const cycle_points = Math.round( a_cycle * 100) % 100;

             if(cycle_points < 50){
                 return samp.amplitude * 1;
             }
             return samp.amplitude * -1;
        },
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {
            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {

            const sample_rate = opt.sound.sample_rate;
            

            const spc = sud.samples_per_cycle = Math.floor(700 - 698 * a_sound) ;
            sud.frequency = samp.frequency = sample_rate / spc;
            samp.amplitude = 0.40;

/*
            sud.frequency = samp.frequency = Math.floor(sample_rate / 2 * a_sound);
            samp.amplitude = 0.40;

            sud.samples_per_cycle = sample_rate / samp.frequency;
*/

            if(i % 1470 === 0 ){
                //console.log( i, sud.samples_per_cycle )
            }


            return samp;
        },
        secs: 300
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
    const data_samples = CS.create_frame_samples(sud.sound, sm.frame, sm.frameMax );

//console.log(data_samples)

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

    // top text info
    const text_info = '' + 
        ' frequency: ' + sud.frequency.toFixed(4) +
        ' samples_per_cycle: ' + sud.samples_per_cycle.toFixed(4);
        
    ctx.fillStyle = 'white';
    ctx.font = '30px  courier';
    ctx.textBaseline = 'top';
    ctx.fillText(text_info,10,10);

    const text_info2 = '' +
        ' frame: ' + String(sm.frame).padStart(String(sm.frameMax).length, '0') + '/' + sm.frameMax;
    ctx.fillText(text_info2, 10, 40);

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

