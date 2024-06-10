/*    draft01-01-nescover-mm2-bubbleman - form 1bit_music_rolls in videoground-samp-waveform
 *        
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
    '../../../js/samp_create/r0/samp_tools.js',
    '../../../js/samp_create/r0/samp_create.js',
    '../../../js/samp_alphas/r0/samp_alphas.js',
    '../../../js/samp_geodisp/r0/samp_geodisp.js',
    '../../../js/samp_debug/r0/samp_debug.js',
    '../../../js/music_roll/r0/music_roll.js',
    '../../../js/bit_tracks/r2/bit_tracks.js',
    '../../../js/export_done/r0/export_done.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){

    camera.position.set(0,0,-10);
    camera.lookAt(0,0,0);
   
    const sud = scene.userData;

    const URI_ROLL = videoAPI.pathJoin( sm.filePath, 'mm2_bubbleman_roll.txt' );
    
    sud.disp_mix = Samp_geodisp.create_points( { point_size: 0.25, x_delta: 6.25 } );

    scene.add( sud.disp_mix );

    return videoAPI.read( URI_ROLL,  {alpha: 0, buffer_size_alpha: 1} )
    .then((roll)=>{
        const song_obj = Music_roll.parse( roll );
        // set up tracks object
        sud.tracks = Bit_tracks.create({
            count: 3,
            objects: [
                {
                    waveform: 'pulse2a_1bit',
                    mode: 'tone',
                    desc: 'pulse2a_1bit Harp',
                    a_note_mode: 'pad:15', //'sin',
                    samp: {
                        amplitude: 1,
                        frequency: 0,
                        duty: 0.50,
                        d1: 0.35,d2: 0.65,
                        a_note: 1
                    }
                },
                {
                    waveform: 'pulse2a_1bit',
                    mode: 'tone',
                    desc: 'pulse2a_1bit Oboe',
                    a_note_mode: 'sin', //'pad:15',
                    samp: {
                        amplitude: 1,
                        frequency: 0,
                        //duty: 0.50,
                        d1: 0.35,d2: 0.65,
                        a_note: 1
                    }
                },
                {
                    waveform: 'pulse_1bit',
                    mode: 'tone',
                    desc: 'pulse_1bit Bass',
                    a_note_mode: 'pad:15',
                    samp: {
                        amplitude: 1,
                        frequency: 0,
                        duty: 0.50,
                        //d1: 0.35,d2: 0.65,
                        a_note: 1
                    }
                }
            ]
        });
        // create the main sound object using CS.create_sound
        const sound = sud.sound = CS.create_sound({
            waveform: (samp, a_wave) => {
            
                const n = Bit_tracks.waveforms.merge(samp, a_wave);
                Samp_geodisp.update_point( sud.disp_mix, samp.i, n );
            
                return n;
            },
            for_frame : (fs, frame, max_frame, a_sound2, opt ) => {
                Bit_tracks.new_frame(sud.tracks, a_sound2);
                return fs;
            },
            for_sampset: ( samp, i, a_sound, fs, opt ) => {
                const array_samp = Music_roll.play(song_obj, a_sound);
                Bit_tracks.apply_music_roll(sud.tracks, array_samp);
                const sec_alpha = Samp_alphas.cell(i, 44100, 0);
                samp = Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, sec_alpha );
                
                samp.i = i % 1470;
                
                return samp;
            },
            secs: Math.ceil( song_obj.total_secs )
        });
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
    const sound = sud.sound;
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
