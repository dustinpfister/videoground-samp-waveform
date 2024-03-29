/*    video01-03-start-range - form vector3_start in videoground-samp-waveform
          * (done) have a fixed range of waveforms each with a fixed pitch
          * (done) the unit length of the vector will still set amplitude, but y dir will be used to find out how to apply it.
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_create/r0/samp_draw.js',
  '../../../js/samp_create/r0/waveforms/table_maxch.js',
  '../../../js/samp_create/r0/waveforms/tri.js',
  '../../../js/samp_create/r0/waveforms/seededsaw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){

    const NOTE_RANGE = 12;
    const V3_COUNT = 6;

    // helper functions
    const int_array_notes = (note_range = 12) => {
        return new Array(note_range).fill( [0,0,0] );
    };

    // make a single object for the table array of a table waveform
    const make_table_waveform = (index=0, array=[]) => {
        return {
            waveform: 'seededsaw',
            frequency: 80 + 100 * index,
            amplitude: array[index][0] / array.length,
            values_per_wave: Math.floor(array[index][1] / V3_COUNT / array.length),
            saw_effect: Math.floor(array[index][2] / V3_COUNT / array.length)
        }
    };

    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    // fixed camera pos
    camera.position.set( 2, 2, 2 );
    camera.lookAt( 0, 0, 0 );

    // grid
    const grid = new THREE.GridHelper(2, 10);
    grid.material.linewidth = 4;
    scene.add(grid);

    // geometry
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

    let gi = 0;
    while(gi < V3_COUNT){
        const mesh = new THREE.Mesh( geometry1, material1  );
        group.add(mesh);
        gi += 1;

    }

    //const mesh2 = sud.mesh2 = new THREE.Mesh( geometry1, material1  );
    //group.add(mesh2);

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

    // the sound object
    const sound = sud.sound = CS.create_sound({
        waveform : 'table_maxch',
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            fs.array_notes = int_array_notes(NOTE_RANGE);

            let gi = 0;
            let g_len = group.children.length;
            const table = fs.table = [];
            while(gi < g_len){
                const mesh = group.children[gi];

                const a1 = (a_sound2 + (gi / g_len)) * 60 % 1;
                const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
                const n = 0.75 + 0.5 * a2;
                mesh.scale.set( n, n, n );

                let e = new THREE.Euler();
                e.y = Math.PI * (2 * (gi / g_len)) + Math.PI * 8 * a_sound2;
                e.x = Math.PI * ((2 * a_sound2) * (gi / g_len)) + Math.PI * 16 * a_sound2;

                let a3 = ( 4 + gi ) * a_sound2 % 1;

                let s = Math.sin( Math.PI * a_sound2 );

                const v3 = mesh.position.set(0,0,1).applyEuler(e).normalize().multiplyScalar(s);

                // Y is used for pitch
                const pitch = ( v3.y + 1 ) / 2;
                let i_note = 0;
                while(i_note < NOTE_RANGE){
                    const a_note = i_note  / ( NOTE_RANGE - 1 );
                    const v2_note = new THREE.Vector2(a_note, 0);
                    const v2_pitch = new THREE.Vector2(pitch, 0); 
                    const d = v2_note.distanceTo(v2_pitch);

                    fs.array_notes[i_note][0] += ( 1 - d ) * v3.length();

fs.array_notes[i_note][1] += (20 + 40 * ( (v3.x + 1) / 2)  );

fs.array_notes[i_note][2] += (v3.z + 1) / 2

                    i_note += 1;
                }

                gi += 1;
            }

console.log( fs.array_notes[0] )

            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {

            return {
                amplitude: 0.30, //??? Maybe it is not so bad to treat this as a kind of master volume
                frequency: 1,
                a_wave: a_sound * opt.secs % 1,
                maxch: NOTE_RANGE,
                table: [
                    make_table_waveform(0, fs.array_notes, a_sound),
                    make_table_waveform(1, fs.array_notes, a_sound),
                    make_table_waveform(2, fs.array_notes, a_sound),
                    make_table_waveform(3, fs.array_notes, a_sound),
                    make_table_waveform(4, fs.array_notes, a_sound),
                    make_table_waveform(5, fs.array_notes, a_sound),
                    make_table_waveform(6, fs.array_notes, a_sound),
                    make_table_waveform(7, fs.array_notes, a_sound),
                    make_table_waveform(8, fs.array_notes, a_sound),
                    make_table_waveform(9, fs.array_notes, a_sound),
                    make_table_waveform(10, fs.array_notes, a_sound),
                    make_table_waveform(11, fs.array_notes, a_sound)                ]
            };
        },
        secs: 30
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

