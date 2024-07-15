/*    draft01-02-test-waveform-params - form shorts_3track in videoground-samp-waveform
 *        
 */
VIDEO.resmode = 6;
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
    '../../samp_create/r0/samp_tools.js',
    '../../samp_create/r0/samp_create.js',
    '../../samp_geodisp/r0/samp_geodisp.js',
    '../../samp_alphas/r0/samp_alphas.js',
    '../../samp_debug/r0/samp_debug.js',
    './../r1/music_roll.js',
    '../../export_done/r0/export_done.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    const sud = scene.userData;
    // the music roll file to use
    const URI_ROLL = videoAPI.pathJoin( sm.filePath, './roll_r1_basic.txt' );
    /********* **********
    FIXED CAMERA SETTINGS
    ********** *********/
    camera.fov = 30;
    camera.updateProjectionMatrix();
    camera.position.set(0, 0, 35);
    camera.lookAt(0,0,0);
    // BACKGROUND
    scene.background = new THREE.Color( 0.10, 0.10, 0.10 );
    /********* **********
    DISP GRID
    ********** *********/
    sud.disp_points_0 = Samp_geodisp.create_line( { y: 3, linewidth: 10, for_vertcolor: (a) => { return [0,1,0] } } );
    scene.add( sud.disp_points_0 );
    const create_disp_grid = () => {
        const grid = new THREE.GridHelper( 2, 2, 0x808080, 0x808080);
        grid.position.z = -0.25;
        grid.material.linewidth = 4;
        grid.rotation.x = Math.PI * 0.5;
        grid.scale.set(5,1,1);
        return grid;
    };  
    sud.disp_points_0.add( create_disp_grid() );
    /********* **********
    READ ROLL
    ********** *********/
    return videoAPI.read( URI_ROLL,  {alpha: 0, buffer_size_alpha: 1} )
    .then((roll)=>{
        sud.song_obj = Music_roll.parse( roll );     
        // create the main sound object using CS.create_sound
        const sound = sud.sound = CS.create_sound({
            waveform: (samp, a_wave) => {        
                if(!samp.frequency){ return 0; }
                const a_cycle = a_wave * samp.frequency % 1;  
                let a_bias = 1 - Math.abs( 0.5 - a_cycle ) / 0.5;
                if(samp.step_count >= 2){
                    a_bias = Math.floor( a_bias * samp.step_count) / (samp.step_count - 1);
                }
                const amp = samp.amplitude;
                let n = 0;
                // in the waveform I choose what to do with the note alpha value
                if(samp.a_note > 0.10 && samp.a_note < 0.90){
                    n = amp * -1 + amp * 2 * a_bias;
                }
                Samp_geodisp.update_point( sud.disp_points_0, samp.i, n );
                return n;       
            },
            for_sampset: ( samp, i, a_sound, fs, opt ) => {
                const array_samp = Music_roll.play(sud.song_obj, a_sound);
                samp = array_samp[0];
                samp.amplitude = samp.amplitude / 100;
                samp.a_wave = opt.secs * a_sound % 1;
                samp.step_count = 8;
                samp.i = i % 1470;
                return samp;
            },
            secs: sud.song_obj.total_secs
        });
        // in the player file I choose what to do about rounding fractions of a frame
        sm.frameMax = Math.ceil(sound.frames);
    });
};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){
    const sud = scene.userData;
    const data_samples = CS.create_frame_samples(sud.sound, sm.frame, sm.frameMax );
    return CS.write_frame_samples(sud.sound, data_samples, sm.frame, sm.imageFolder, sm.isExport);
};
//-------- ----------
// RENDER
//-------- ----------
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
    const sud = scene.userData;
    // draw 3d
    renderer.render(scene, camera);
    ctx.drawImage(renderer.domElement, 0, 0, canvas.width, canvas.height);
    // draw title with 2d context
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '35px courier';
    ctx.fillText(sud.song_obj.title.trim(), canvas.width / 2, 150);
    ctx.fillText(sud.song_obj.album.trim(), canvas.width / 2, 200);
    ctx.fillText('by ' + sud.song_obj.artist.trim(), canvas.width / 2, 250);
};
//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};
