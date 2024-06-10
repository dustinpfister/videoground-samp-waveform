/*    draft01-01-test-core-idea - form shorts_3track in videoground-samp-waveform
 *        
 */
VIDEO.resmode = 6;
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
    '../../../js/samp_create/r0/samp_tools.js',
    '../../../js/samp_create/r0/samp_create.js',
    '../../../js/samp_geodisp/r0/samp_geodisp.js',
    '../../../js/samp_alphas/r0/samp_alphas.js',
    '../../../js/samp_debug/r0/samp_debug.js',
    '../../../js/music_roll/r0/music_roll.js',
    '../../../js/export_done/r0/export_done.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){

    const sud = scene.userData;

    // the music roll file to use
    const URI_ROLL = videoAPI.pathJoin( sm.filePath, 'draft_roll.txt' );

    // FIXED CAMERA SETTINGS
    camera.fov = 30;
    camera.updateProjectionMatrix();
    camera.position.set(0, 5, 40);
    camera.lookAt(0,0,0);


    // BACKGROUND
    scene.background = new THREE.Color( 0.25, 0.25, 0.25 );

    // create display points
    //sud.disp_points_0 = Samp_geodisp.create_points(1470,  3);
    //sud.disp_points_1 = Samp_geodisp.create_points(1470,  0);
    //sud.disp_points_2 = Samp_geodisp.create_points(1470, -3);
    
    sud.disp_points_0 = Samp_geodisp.create_points( { y: 3 } );
    sud.disp_points_0 = Samp_geodisp.create_points( { y: 0 } );
    sud.disp_points_0 = Samp_geodisp.create_points( { y:-3 } );
    
    scene.add( sud.disp_points_0, sud.disp_points_1, sud.disp_points_2 );
    
    const grid = new THREE.GridHelper( 10, 10, 0xafafaf, 0xafafaf);
    grid.position.z = -0.25;
    grid.material.linewidth = 4;
    grid.rotation.x = Math.PI * 0.5;
    scene.add( grid );
   
    return videoAPI.read( URI_ROLL,  {alpha: 0, buffer_size_alpha: 1} )
    .then((roll)=>{
    
        const song_obj = Music_roll.parse( roll );


        // create the main sound object using CS.create_sound
        const sound = sud.sound = CS.create_sound({
            waveform: (samp, a_wave) => {

                const amp0 = samp.amp0 === undefined ? 1.0 : samp.amp0;
                const freq0 = samp.freq0 === undefined ? 0 : samp.freq0;
                const a0 = a_wave * freq0 % 1;
                const n0 = Math.sin( Math.PI * 2 * a0 ) * amp0;
            
                const amp1 = samp.amp1 === undefined ? 1.0 : samp.amp1;
                const freq1 = samp.freq1 === undefined ? 0 : samp.freq1;
                const a1 = a_wave * freq1 % 1;
                const n1 = Math.sin( Math.PI * 2 * a1 ) * amp1;
            
                const amp2 = samp.amp2 === undefined ? 1.0 : samp.amp2;
                const freq2 = samp.freq2 === undefined ? 0 : samp.freq2;
                const a2 = a_wave * freq2 % 1;
                const n2 = Math.sin( Math.PI * 2 * a2 ) * amp2;
            
                Samp_geodisp.update_point( sud.disp_points_0, samp.i, n0 );
                Samp_geodisp.update_point( sud.disp_points_1, samp.i, n1 );
                Samp_geodisp.update_point( sud.disp_points_2, samp.i, n2 );
            
                return ( n0 + n1 + n2 ) / 3 * samp.master_amplitude;

            },
            for_sampset: ( samp, i, a_sound, fs, opt ) => {
                const array_samp = Music_roll.play(song_obj, a_sound);

                samp.amp0 = Samp_alphas.sin(array_samp[0].a_note, 1, 1) * 0.15;
                samp.freq0 = array_samp[0].frequency;
            
                samp.amp1 = Samp_alphas.sin(array_samp[1].a_note, 1, 1) * 0.35;
                samp.freq1 = array_samp[1].frequency;
            
                //!!! I will want to work out new logic for adjusting amplitude
                //const a_pad = Samp_alphas.pad(array_samp[2].a_note, 1, 1, true, 0.10, 0.90, 0);
                //const a_padsin = 1; //Samp_alphas.sin(a_pad, 1, 1);
                //samp.amp2 = a_padsin * 1.00;
            
                samp.amp2 = Samp_alphas.sin(array_samp[2].a_note, 1, 1) * 1.00;
                samp.freq2 = array_samp[2].frequency;

                samp.master_amplitude = 0.65;
                samp.a_wave = opt.secs * a_sound % 1;
                samp.i = i % 1470;

                return samp;

            },
            secs: Math.ceil( song_obj.total_secs )
        });

        // set vg sm.frameMax to frames value of sound object
        sm.frameMax = sound.frames;
    
    });
    
    
};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){
    const sud = scene.userData;
    
    camera.position.set(-10 + 20 * bias, 0, 35);
    camera.lookAt(0,0,0);
    
    const data_samples = CS.create_frame_samples(sud.sound, sm.frame, sm.frameMax );
    return CS.write_frame_samples(sud.sound, data_samples, sm.frame, sm.imageFolder, sm.isExport);
};
//-------- ----------
// RENDER
//-------- ----------
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
    const sud = scene.userData;
    
    
    //sud.disp_points.geometry.getAttribute('position').needsUpdate = true;
    
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0, canvas.width, canvas.height);


    renderer.render(scene, camera);
    ctx.drawImage(renderer.domElement, 0, 0, canvas.width, canvas.height);

};

//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};
