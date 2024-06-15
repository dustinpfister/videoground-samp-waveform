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
    const URI_ROLL = videoAPI.pathJoin( sm.filePath, '../../../rolls/draft/3track_test_1.txt' );

    
    const wf_sin = (samp, a_wave) => {
        const a_cycle = a_wave * samp.freq % 1;
        const amp = Samp_alphas.sin(samp.a_note, 1, 1) * samp.amp;       
        return Math.sin( Math.PI * 2 * a_cycle ) * amp;          
    };
    
    const wf_square = (samp, a_wave) => {
        const a_cycle = a_wave * samp.freq % 1;
        const amp = Samp_alphas.sin(samp.a_note, 1, 1) * samp.amp;       
        let n = -1;
        if(a_cycle >= 0.5){
           n = 1;
        }
        return n * amp;
    };

    const THREE_TRACKS = {
        master_amplitude: 0.65,
        total_mix_points: 3,
        tracks: [
            {
                mix_points: 1,
                waveform: wf_sin
            },
            {
                mix_points: 1,
                waveform: wf_sin
            },
            {
                mix_points: 1,
                waveform: wf_square
            }
        ]
    };

    // FIXED CAMERA SETTINGS
    camera.fov = 30;
    camera.updateProjectionMatrix();
    camera.position.set(0, 5, 40);
    camera.lookAt(0,0,0);

    // BACKGROUND
    scene.background = new THREE.Color( 0.25, 0.25, 0.25 );

    // create display points
    sud.disp_points_0 = Samp_geodisp.create_line( { y: 3, linewidth: 18 } );
    sud.disp_points_1 = Samp_geodisp.create_line( { y: 0, linewidth: 18 } );
    sud.disp_points_2 = Samp_geodisp.create_line( { y:-3, linewidth: 18 } );
    
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
                        
                let n0 = THREE_TRACKS.tracks[0].waveform(samp.tracks[0], a_wave);
                let n1 = THREE_TRACKS.tracks[1].waveform(samp.tracks[1], a_wave);
                let n2 = THREE_TRACKS.tracks[2].waveform(samp.tracks[2], a_wave);
            
                Samp_geodisp.update_point( sud.disp_points_0, samp.i, n0 );
                Samp_geodisp.update_point( sud.disp_points_1, samp.i, n1 );
                Samp_geodisp.update_point( sud.disp_points_2, samp.i, n2 );
                
                n0 = n0 * THREE_TRACKS.tracks[0].mix_points / THREE_TRACKS.total_mix_points;
                n1 = n1 * THREE_TRACKS.tracks[1].mix_points / THREE_TRACKS.total_mix_points;
                n2 = n2 * THREE_TRACKS.tracks[2].mix_points / THREE_TRACKS.total_mix_points;
                
                return ( n0 + n1 + n2 ) * samp.master_amplitude;
                
            },
            for_sampset: ( samp, i, a_sound, fs, opt ) => {
                const array_samp = Music_roll.play(song_obj, a_sound);

                samp.tracks = THREE_TRACKS.tracks.map( (track, i) => {
                    return {
                        amp: 1.00,
                        a_note: array_samp[i].a_note,
                        freq: array_samp[i].frequency
                    };
                });
                
                samp.master_amplitude = THREE_TRACKS.master_amplitude;
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
