/*    video01-02-nescover-megaman2-bubbleman - form 1bit_music_rolls in videoground-samp-waveform
 *        
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
    '../../../js/samp_create/r0/samp_tools.js',
    '../../../js/samp_create/r0/samp_create.js',
    '../../../js/samp_alphas/r0/samp_alphas.js',
    '../../../js/samp_debug/r0/samp_debug.js',
    '../../../js/music_roll/r0/music_roll.js',
    '../../../js/bit_tracks/r2/bit_tracks.js',
    '../../../js/bit_tracks/r2/bit_samp_draw.js',
    '../../../js/export_done/r0/export_done.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){

    // set clear color for three.js renderer
    sm.renderer.setClearColor(0x000000, 0);

    camera.far = 50;
    camera.updateProjectionMatrix()

    // starting a new visual thing for this
    const grid = new THREE.GridHelper(200, 60, 0xffffff, 0xffffff );
    grid.position.y = -2;
    grid.material.linewidth = 4;
    scene.add(grid);

    const grid2 = new THREE.GridHelper(200, 60, 0xffffff, 0xffffff );
    grid2.position.y = 2;
    grid2.material.linewidth = 4;
    scene.add(grid2);

   
    const sud = scene.userData;

    const song = `
# megaman2 bubbleman based on midi file found here: https://www.vgmusic.com/music/console/nintendo/nes/by-bubbleman.mid
>title='Megaman 2 : Bubbleman Stage 1-bit-tracks > 16-bit final mix '
>lines_per_minute=700;
#
# measure 1; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# Ending silence
#
--- -;--- -;--- -;
--- -;--- -;--- -;
`;


    const song_obj = Music_roll.parse( song );

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 3,
        objects: [
            {
                waveform: 'pulse2a_1bit',
                mode: 'tone',
                desc: 'pulse2a_1bit Harp',
                a_note_mode: 'sin',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    //d1: 0.45,d2: 0.55,
                    d1: 0.35,d2: 0.65,
                    //d1: 0.15, d2: 0.85,
                    a_note: 1
                }
            },
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'pulse_1bit Oboe',
                a_note_mode: 'pad:15',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    duty: 0.5,
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
                    duty: 0.5,
                    a_note: 1
                }
            }

        ]
    });

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {
            Bit_tracks.new_frame(sud.tracks, a_sound2);
            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const array_samp = Music_roll.play(song_obj, a_sound);

            // can adjust track freq like this if I want
            array_samp[0].frequency = Math.floor(array_samp[0].frequency * 0.30 );

            Bit_tracks.apply_music_roll(sud.tracks, array_samp);



   
            const sec_alpha = Samp_alphas.cell(i, 44100, 0);
            samp = Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, sec_alpha );
            return samp;

        },
        secs: Math.ceil( song_obj.total_secs )
    });

    // display objects for audio sample arrays for tracks and main final display
    sud.track_disp_opt = DSD.create_disp_options(sud.tracks, sound, {
        w: 600, h: 600, sx: 1279 - 650, sy: 120,
        line_width: 6, 
        midline_style: ['black', 'yellow'],
        track_styles: ['white', 'black'],
        mix_styles: ['red', 'yellow']
    });
    // set vg sm.frameMax to frames value of sound object
    sm.frameMax = sound.frames;

    return new Promise( (resolve, reject) => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
                resolve('we should be good')
        };
        const loader = new THREE.ImageLoader(manager);
        const image_error = (err) => {
            console.warn('image error.');
        };
        const url_subject = videoAPI.pathJoin(sm.filePath, 'img/video01-02-subject.png');
        const url_background = videoAPI.pathJoin(sm.filePath, 'img/video01-02-background.png');
        loader.load( url_subject, ( image ) => { sud.img_subject = image; }, undefined, image_error );
        loader.load( url_background, ( image ) => { sud.img_background = image; }, undefined, image_error );
    });

};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){

    // update camera
    const z = -100 + 150 * per;

    camera.position.set( 0, 0, z );
    camera.lookAt( 0, 0, z + 10 );


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

    // background
    ctx.drawImage( sud.img_background, 0, 0, canvas.width, canvas.height );

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // draw scene object
    renderer.render(scene, camera);
    ctx.drawImage(renderer.domElement, 0,0, canvas.width, canvas.height);

    // draw sample data for 1bit tracks, and 16bit mix
    ctx.fillStyle = 'rgba(0,128,128,0.8)';


    ctx.fillRect(600,40, 660, 660);


    DSD.draw_tracks(ctx, sud.tracks, sud.track_disp_opt);
    DSD.draw( ctx, sound.array_frame, sud.track_disp_opt.mix, sm.per, 'final 16-bit mix' );

    // draw subject image
    if(sud.img_subject){
        ctx.drawImage( sud.img_subject, 100, 170, 400, 400 );
    }

    // top display info
    DSD.draw_info(ctx, sound, sm, '#ffffff', 30);

};

//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};
