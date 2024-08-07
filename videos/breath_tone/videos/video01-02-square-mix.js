/*    video01-02-square-mix.js - form breath_tone in videoground-samp-waveform
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
           cycle_count: 3,      // number of cycles
           a_cycle: 0,          // alpha for the current breath cycle
           a_state: 0,
           i_state: 0,          // breath state index ( 0=hold, 1=inhale, 2=hold, 3=exhale )
           secs: [4,1,4,1],     // number of secs for each breath state     
           ratios: [0,0,0,0],
           secs_per_cycle: 0,
           total_secs: 0
        };
        breath.secs_per_cycle = breath.secs.reduce( (acc, sec) => { return acc + sec }, 0 );
        breath.total_secs = breath.secs_per_cycle * breath.cycle_count;
        breath.ratios = breath.secs.map((secs)=>{ return secs / breath.secs_per_cycle });
        return breath;
    };


    breath_mod.update = ( breath, alpha=0 ) => {
        const secs = breath.total_secs * alpha;
        // alpha for the current cycle
        breath.a_cycle = (secs % breath.secs_per_cycle ) / breath.secs_per_cycle;
        // set current breath state index, and breath alpha
        breath.i_state = 0;
        breath.a_state = 0;
        let a = 0;
        while(breath.i_state < 4){
           const a_old = a; 
           a += breath.ratios[ breath.i_state ];
           breath.a_state = ( breath.a_cycle - a_old ) / (a - a_old) 
           if( breath.a_cycle < a ){
               break;
           }
           breath.i_state += 1;
        }    
        return breath;
    };
    
    // SCENE USER DATA OBJECT
    const sud = scene.userData;
    sud.breath = breath_mod.create();
    
    /*
    [0.75, 0.80, 0.99, 1.00].forEach((a)=>{
        breath_mod.update(sud.breath, a);
        console.log( 'a: ' + a );
        console.log( 'i_state: ' + sud.breath.i_state );
        console.log( 'a_state: ' + sud.breath.a_state );
        console.log( '' );
    });
    */
    
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
    
    // pulse waveform
    const pulse = (samp, a_wave) => {
        const duty = samp.duty === undefined ? 0.5 : samp.duty;
        const a_cycle = samp.frequency * a_wave % 1;
        let n = samp.amplitude * -1;
        if(a_cycle >= duty){
            n = samp.amplitude * 1;
        }
        return n;
    };
    
    // SOUND
    const sound = sud.sound = CS.create_sound({
        waveform: (samp, a_wave) => {
        
            let a1 = 1, a2 = 0;
        
        
            if(sud.breath.i_state === 1){        
                a1 = 1 - sud.breath.a_state;
                a2 = sud.breath.a_state;
            }
            if(sud.breath.i_state === 2){        
                a1 = 0;
                a2 = 1;
            }
            if(sud.breath.i_state === 3){        
                a1 = sud.breath.a_state;
                a2 = 1 - sud.breath.a_state;
            }
            

            const n1 = pulse({ frequency: 84, amplitude: a1, duty: 0.50 }, a_wave);
            const n2 = pulse({ frequency: 168, amplitude: a2, duty: 0.90 }, a_wave);

            const n = (n1 + n2) / 2

            Samp_geodisp.update_point( sud.disp_points_0, samp.i, n );            
            return n;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
        
        
            breath_mod.update( sud.breath, a_sound );
        
            
            /*
            const a = 64;
            const c = 2;
            const b = 32;
            
            samp.frequency = a;
            
            if(sud.breath.i_state === 1){        
                samp.frequency = a + c * Math.round( b * sud.breath.a_state );
            }
            if(sud.breath.i_state === 2){        
                samp.frequency = a + c * b;
            }
            if(sud.breath.i_state === 3){        
                samp.frequency = (a + c * b) - c * Math.round( b * sud.breath.a_state );
            }
            
            samp.amplitude = 1.00;
            */
            
            
            samp.a_wave = opt.secs * a_sound % 1;
            samp.i = i % 1470;
            return samp;
        },
        secs: sud.breath.total_secs
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
