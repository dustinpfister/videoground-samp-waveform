/*    video01-02-start-mix - form vector3_start in videoground-samp-waveform
          * () use a table waveform in place of just seededsaw
          * () have more than one vector3 object
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_create/r0/samp_draw.js',
  '../../../js/samp_create/r0/waveforms/table_maxch.js',
  '../../../js/samp_create/r0/waveforms/seededsaw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    // fixed camera pos
    camera.position.set( 2, 2, 2 );
    camera.lookAt( 0, 0, 0 );

    // grid
    const grid = new THREE.GridHelper(2, 10);
    grid.material.linewidth = 4;
    scene.add(grid);

    // geomety
    const geometry1 = new THREE.SphereGeometry(0.10, 20, 20);

    // adding a color attribute
    const len = geometry1.getAttribute('position').count;
    const color_array = [];
    let i = 0;
    while(i < len){
        const a1 = i / len;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        color_array.push(a1, a2, 1 - a2);
        i += 1;
    }
    const color_attribute = new THREE.BufferAttribute( new Float32Array( color_array ), 3 );
    geometry1.setAttribute('color', color_attribute);
    const material1 = new THREE.MeshBasicMaterial({ vertexColors: true });

    const group = new THREE.Group();
    scene.add(group);

    const mesh1 = sud.mesh1 = new THREE.Mesh( geometry1, material1  );
    group.add(mesh1);

    const mesh2 = sud.mesh2 = new THREE.Mesh( geometry1, material1  );
    group.add(mesh2);

    // arrows
    const ARROW_ORIGIN = new THREE.Vector3(0,0,0);
    const ARROW_LINEWIDTH = 6;
    const ARROW_LENGTH = 1.2;
    const arrow_x = new THREE.ArrowHelper( new THREE.Vector3(1,0,0), ARROW_ORIGIN, ARROW_LENGTH, 0xff0000 );
    const arrow_y = new THREE.ArrowHelper( new THREE.Vector3(0,1,0), ARROW_ORIGIN, ARROW_LENGTH, 0x00ff00 );
    const arrow_z = new THREE.ArrowHelper( new THREE.Vector3(0,0,1), ARROW_ORIGIN, ARROW_LENGTH, 0x0000ff );
    arrow_x.children[0].material.linewidth = ARROW_LINEWIDTH;
    arrow_y.children[0].material.linewidth = ARROW_LINEWIDTH;
    arrow_z.children[0].material.linewidth = ARROW_LINEWIDTH;

    scene.add(arrow_x, arrow_y, arrow_z);

    // DEFAULT V3 Location
    //const V3_DEFAULT = new THREE.Vector3( 0, 0, 0.75);

    // the sound object
    const sound = sud.sound = CS.create_sound({
        //waveform : 'seededsaw',
        waveform : 'table_maxch',
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            let gi = 0;
            let g_len = group.children.length;
            const table = fs.table = [];
            while(gi < g_len){
                const mesh = group.children[gi];
                let e = new THREE.Euler();
                e.y = Math.PI * 2 * ( (8 + 8 * gi ) * a_sound2 );
                e.x = Math.PI * 2 * ( (2 + 2 * gi ) * a_sound2 );
                let a1 = 2 * a_sound2 % 1;
                let a2 = Math.abs(0.5 - a1) / 0.5
                let s = 0.10 + 0.80 * a2;

                const v3 = mesh.position.set(0,0,1).applyEuler(e).normalize().multiplyScalar(s);


                const pitch = ( v3.y + 1 ) / 2;
                table.push({
                    waveform: gi === 0 ? 'sin' : 'seededsaw',
                    frequency: 40 + 30 * pitch,
                    amplitude: v3.length(),
                    saw_effect : ( v3.x + 1 ) / 2,
                    values_per_wave : 5 + 95 * ( ( v3.z + 1 ) / 2 )
                });

                gi += 1;
            }

            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
/*
            samp.i = i;

            const v3 = mesh1.position;

            // x for saw effect param
            samp.saw_effect = ( v3.x + 1 ) / 2;
            // y dir effects pitch
            const pitch = ( v3.y + 1 ) / 2;
            samp.frequency = 40 + 30 * pitch;
            // z for values per second
            samp.values_per_wave = 5 + 95 * ( ( v3.z + 1 ) / 2 );
            // vector unit length effects amplitude
            samp.amplitude = v3.length();
            samp.a_wave = a_sound * opt.secs % 1;
*/
            //return samp;

/*
            const table = [];
            let gi = 0;
            let g_len = group.children.length;
            while(gi < g_len){
                table.push({  waveform: 'sin', frequency: 100, amplitude: 1});
            }
*/
            return {
                amplitude: 1,
                frequency: 1,
                a_wave: a_sound * opt.secs % 1,
                maxch: fs.table.length,
                table: fs.table
            };

        },
        secs: 60
    });
    // frame disp options
    sud.opt_frame = {
        w: 500, h: 220, sy: 250, sx: 40,
        padx: 0, pady: -35, 
        mode: sound.mode,
        overlay_alpha: 0.5, lineWidth: 3
    };
    sm.frameMax = sound.frames;
};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){
    const sud = scene.userData;
    // mesh effect
    const a1 = per * 60 % 1;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    const s = 0.75 + 0.5 * a2;
    sud.mesh1.scale.set(s,s,s)
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
    DSD.draw( ctx, sound.array_frame, sud.opt_frame, 0, 'frame sample data ' );
    DSD.draw_info(ctx, sound, sm);



};

