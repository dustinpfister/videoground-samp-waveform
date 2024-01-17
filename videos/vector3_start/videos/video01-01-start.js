/*    video01-01-start - form vector3_start in videoground-samp-waveform 
          * Just want to work out what the basic idea of this is.
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_create/r0/samp_draw.js',
  '../../../js/samp_create/r0/waveforms/seededsaw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);


    camera.position.set( 2, 2, 2 );
    camera.lookAt( 0, 0, 0 );

    const grid = new THREE.GridHelper(2, 10);
    scene.add(grid);


    const geometry1 = new THREE.SphereGeometry(0.1, 20, 20);
    const material1 = new THREE.MeshNormalMaterial();
    const mesh1 = new THREE.Mesh( geometry1, material1  );
    scene.add(mesh1);

    const V3_DEFAULT = new THREE.Vector3( 0, 0, 0.75);

    sud.v3 = V3_DEFAULT.clone();

    const sound = sud.sound = CS.create_sound({

        waveform : 'seededsaw',

        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            const e = new THREE.Euler();
            e.y = Math.PI * 2 * ( 8 * a_sound2 );
            e.x = Math.PI * 2 * ( 2 * a_sound2 );

            const a1 = 2 * a_sound2 % 1;
            const a2 = Math.abs(0.5 - a1) / 0.5
            const s = 0.10 + 0.80 * a2;

            fs.v3 = V3_DEFAULT.clone().applyEuler(e).normalize().multiplyScalar(s);

            mesh1.position.copy(fs.v3);
 
            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {

            samp.i = i;

            samp.saw_effect = ( fs.v3.x + 1 ) / 2;

            samp.values_per_wave = 5 + 45 * ( ( fs.v3.z + 1 ) / 2 );

            // y dir effects pitch
            const pitch = ( fs.v3.y + 1 ) / 2;
            samp.frequency = 40 + 30 * pitch;

            // vector unit length effects amplitude
            samp.amplitude = fs.v3.length();
            samp.a_wave = a_sound * opt.secs % 1;

            return samp;
        },
        secs: 20
    });
    sud.opt_frame = { w: 500, h: 220, sy: 250, sx: 40, mode: sound.mode, overlay_alpha: 0.5 };
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


    renderer.render(scene, camera)
    ctx.drawImage( renderer.domElement, 500, 80, 16 * 50, 9 * 50 );


    // draw frame disp, and info
    DSD.draw( ctx, sound.array_frame, sud.opt_frame, 0, 'sample data ( current frame )' );
    DSD.draw_info(ctx, sound, sm);



};

