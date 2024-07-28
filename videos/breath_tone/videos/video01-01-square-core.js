/*    video01-01-square-core.js - form breath_tone in videoground-samp-waveform
 *        
 */
VIDEO.resmode = 0;
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
    '../../../js/samp_create/r0/samp_tools.js',
    '../../../js/samp_create/r0/samp_create.js',
    '../../../js/samp_geodisp/r0/samp_geodisp.js',
    '../../../js/samp_alphas/r0/samp_alphas.js',
    '../../../js/samp_debug/r0/samp_debug.js',
    '../../../js/export_done/r0/export_done.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){

    // BREATH
    
    const breath_mod = {};
    
    // create a breath state object
    breath_mod.create = ( opt={} ) => {
        const breath = {
           a_cycle: 0,          // alpha for the current breath cycle
           cycle_count: 2,      // number of cycles
           i_breath_state: 0,   // breath state index ( 0=hold, 1=inhale, 2=hold, 3=exhale )
           secs: [4,4,4,4],     // number of secs for each breath state
           secs_per_cycle: 0,
           total_secs: 0
        };
        breath.secs_per_cycle = breath.secs.reduce( (acc, sec) => { return acc + sec }, 0 );
        breath.total_secs = breath.secs_per_cycle * breath.cycle_count;
        return breath;
    };


    // SCENE USER DATA OBJECT
    const sud = scene.userData;
    sud.breath = breath_mod.create();
    
    console.log(sud.breath);
    
    
    // CAMERA
    camera.fov = 30;
    camera.updateProjectionMatrix();
    camera.position.set(0, 0, 35);
    camera.lookAt(0,0,0);

    // BACKGROUND
    scene.background = new THREE.Color( 0.10, 0.10, 0.10 );

    // DISP POINTS
    sud.disp_points_0 = Samp_geodisp.create_line( { y: 3, linewidth: 10, for_vertcolor: (a) => { return [0,1,0] } } );
    scene.add( sud.disp_points_0 );
    
    // SOUND
    const sound = sud.sound = CS.create_sound({
        waveform: (samp, a_wave) => {
            Samp_geodisp.update_point( sud.disp_points_0, samp.i, 0 );            
            return 0
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            samp.a_wave = opt.secs * a_sound % 1;
            return samp;
        },
        secs: 1
    });
    sm.frameMax = sound.frames;
    
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
};

//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};
