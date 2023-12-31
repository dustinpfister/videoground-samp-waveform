/*    video01-01-groovy8k-10persec - form array_groovy in videoground-samp-waveform 
          * another array waveform project this time with audacity sample data export data
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_create/r0/samp_draw.js',
  '../../../js/samp_create/r0/waveforms/array.js',
  '../../../js/samp_create/r0/waveforms/table_maxch.js',
  '../js/waveform_array_groovy8k.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    const MAX_PER_SEC = 10;
    const SECS_PER_STEP = 5;


    const arr2 = [];
    let bi = 0, acc = 0;;
    while(bi < MAX_PER_SEC){
        let n = SECS_PER_STEP * bi;
        acc += n;
        arr2.push(acc);
        bi += 1;
    }



    sud.GPS = 1;

    const sound = sud.sound = CS.create_sound({
        waveform : 'groovy8k',
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {
            fs.freq = sud.GPS = Math.floor(1 + ( MAX_PER_SEC - 1 ) * a_sound2);

            const s = opt.secs * a_sound2;
            const a = sud.GPS * s;

            const arr2_i = Math.floor( (arr2.length - 1) * a_sound2 );
            const b = arr2[ arr2_i ];

            sud.groovies = Math.floor(a - b);



            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const spf = opt.sound.samples_per_frame;
            const frame = Math.floor(i / spf);
            const a_sound2 = frame / (opt.secs * 30);
            const a_frame = (i % spf) / spf;

            samp.amplitude = 0.80;
            samp.frequency = fs.freq;

            return samp;
        },
        secs: SECS_PER_STEP * MAX_PER_SEC
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

    // draw frame disp, and info
    DSD.draw( ctx, sound.array_frame, sud.opt_frame, 0, 'sample data ( current frame )' );
    DSD.draw_info(ctx, sound, sm);

    ctx.fillStyle = 'white';
    ctx.font = '30px courier';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('GROOVIES PER SECOND = ' + sud.GPS, 50, 60);
    ctx.fillText('GRROVIES = ' + sud.groovies, 50, 90);

};

