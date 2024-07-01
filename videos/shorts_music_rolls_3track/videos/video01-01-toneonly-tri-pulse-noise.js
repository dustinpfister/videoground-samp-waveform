/*    video01-01-toneonly-tri-pulse-noise - form shorts_3track in videoground-samp-waveform
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
    const URI_ROLL = videoAPI.pathJoin( sm.filePath, '../../../rolls/shorts_3track/dark_seed/darkseed23_twentythree.txt' );


    /********* **********
    WAVEFORM 0 - TRI
    ********** *********/
    const wf_tri = {
        samp_default: { freq: 0, amp: 0, step_count: 5 },
        waveform: (samp, a_wave) => {
            samp = Object.assign({}, wf_tri.samp_default, samp);
            if(!samp.freq){ return 0; }
            const a_cycle = a_wave * samp.freq % 1;  
            let a_bias = 1 - Math.abs( 0.5 - a_cycle ) / 0.5;
            if(samp.step_count >= 2){
                a_bias = Math.floor( a_bias * samp.step_count) / (samp.step_count - 1);
            } 
            return samp.amp * -1 + samp.amp * 2 * a_bias;
        }    
    };
    const wf_tri_vamp = {
        samp_default: { a_note: 0 },
        waveform: (samp, a_wave) => {
            samp = Object.assign({}, wf_tri_vamp.samp_default, samp);
            samp.amp = Samp_alphas.sin(samp.a_note, 1, 1) * samp.amp;
            return wf_tri.waveform(samp, a_wave);
        }    
    };   
    /********* **********
    WAVEFORM 1 - PULSE
    ********** *********/
    const wf_pulse = {
        samp_default: { duty: 0.50, freq: 0, amp: 0 },
        waveform: (samp, a_wave) => {
            samp = Object.assign({}, wf_pulse.samp_default, samp);
            if(!samp.freq){ return 0; }
            const a_cycle = a_wave * samp.freq % 1;    
            let n = -1;
            if(a_cycle >= samp.duty){
               n = 1;
            }
            return n * samp.amp;
        }    
    };
    const wf_pulse_vduty = {
        samp_default: { v_duty: true, duty_target: 0.50, a_note: 0 },
        waveform: (samp, a_wave) => {
            samp = Object.assign({}, wf_pulse_vduty.samp_default, samp);        
            if(samp.v_duty){
                samp.duty = samp.duty_target * Samp_alphas.sin(samp.a_note, 1, 1);
            }
            if(!samp.v_duty){
                samp.duty = duty_target
            }
            samp.amp = Samp_alphas.sin(samp.a_note, 1, 1) * samp.amp;
            return wf_pulse.waveform(samp, a_wave);
        }
    };    
    /********* **********
    WAVEFORM 2 - NOISE
    ********** *********/
    const wf_noise = {
        samp_default: { freq: 0, amp: 0, values_per_wave: 80, int_shift: 0, freq_alpha: 1 },
        waveform: (samp, a_wave) => {
            samp = Object.assign({}, wf_noise.samp_default, samp);
            if(!samp.freq){ return 0; } 
            const freq_raw = samp.freq;
            const freq = freq_raw * samp.freq_alpha;
            const a = ( a_wave * freq % 1 ) * samp.values_per_wave;
            const i = Math.floor( a * 0.99999999 );
            const b = -1 + 2 * THREE.MathUtils.seededRandom( samp.int_shift + i );
            const n = b;
            return n * samp.amp;
        }  
    };
    const wf_noise_vamp = {
        samp_default: { a_note: 0, vpw_start: 20, vpw_delta: 30 },
        waveform: (samp, a_wave) => {
            samp = Object.assign({}, wf_noise_vamp.samp_default, samp);
            const a2 = Samp_alphas.sin(samp.a_note, 1, 1);
            samp.amp = a2 * samp.amp;
            samp.values_per_wave = samp.vpw_start + samp.vpw_delta * samp.a_note;
            return wf_noise.waveform(samp, a_wave);
        }  
    };
    /********* **********
    TRACK OBJECTS
    ********** *********/
    const THREE_TRACKS = {
        master_amplitude: 0.75,
        total_mix_points: 3,
        tracks: [
            {
                mix_points: 1,
                waveform: wf_tri_vamp.waveform
            },
            {
                mix_points: 1,
                waveform: wf_pulse_vduty.waveform
            },
            {
                mix_points: 1,
                waveform: wf_noise_vamp.waveform
            }
        ]
    };
    /********* **********
    FIXED CAMERA SETTINGS
    ********** *********/
    camera.fov = 30;
    camera.updateProjectionMatrix();
    camera.position.set(0, 0, 35);
    camera.lookAt(0,0,0);

    // BACKGROUND
    scene.background = new THREE.Color( 0.10, 0.10, 0.10 );

    // create display points
    sud.disp_points_0 = Samp_geodisp.create_line( { y: 3, linewidth: 10, for_vertcolor: (a) => { return [1,1-a,a] } } );
    sud.disp_points_1 = Samp_geodisp.create_line( { y: 0, linewidth: 10, for_vertcolor: (a) => { return [0,1,1-a] } } );
    sud.disp_points_2 = Samp_geodisp.create_line( { y:-3, linewidth: 10, for_vertcolor: (a) => { return [a,a,1] } } );
    
    scene.add( sud.disp_points_0, sud.disp_points_1, sud.disp_points_2 );
    
    const create_disp_grid = () => {
    
        const grid = new THREE.GridHelper( 2, 2, 0x808080, 0x808080);
        grid.position.z = -0.25;
        grid.material.linewidth = 4;
        grid.rotation.x = Math.PI * 0.5;
        grid.scale.set(5,1,1);
        return grid;
    
    };
    
   sud.disp_points_0.add( create_disp_grid() );
   sud.disp_points_1.add( create_disp_grid() );
   sud.disp_points_2.add( create_disp_grid() );
   
    return videoAPI.read( URI_ROLL,  {alpha: 0, buffer_size_alpha: 1} )
    .then((roll)=>{

        sud.song_obj = Music_roll.parse( roll );
        
        console.log(sud.song_obj.title);

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
                const array_samp = Music_roll.play(sud.song_obj, a_sound);

                samp.tracks = THREE_TRACKS.tracks.map( (track, i) => {
                    return {
                        amp: array_samp[i].amplitude / 100,
                        a_note: array_samp[i].a_note,
                        freq: array_samp[i].frequency
                    };
                });
                
                samp.master_amplitude = THREE_TRACKS.master_amplitude;
                samp.a_wave = opt.secs * a_sound % 1;
                samp.i = i % 1470;

                return samp;

            },
            secs: Math.ceil( sud.song_obj.total_secs )
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
    const album = sud.song_obj.title.split(':')[0];
    const title = sud.song_obj.title.split(':')[1];
    
    ctx.fillText(album.trim(), canvas.width / 2, 150);
    ctx.fillText(title.trim(), canvas.width / 2, 200);

};

//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};
