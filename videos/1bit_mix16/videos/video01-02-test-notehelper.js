/*    video01-02-test-notehelper - form 1bit_mix16 in videoground-samp-waveform
 *        * (done) start R1 of bit_tracks.js
 *        * (done) fix sum of tracks bug with mix waveform method in bit_tracks.js
 *        * (done) not rounding in Bit_tracks.new_frame
 *        * (done) turns out the distoration has to do with ffmpeg, was fixed by setting audio quality ( -b:a 192k )
 *        * (done) make create_note a method of bit_tracks.js R1
 *        * (done) simple string format for songs
 *        * (done) song_to_notenums method for bit_tracks.js R1
 *        * (done) should be able to adjust fade argumnet for song_to_notnums method
 *        * (done) fade mode for song_to_notnums and create_note, 'latpitch', and 'zerofill'
 *        * (done) make a tune with 2 tracks
 *
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/bit_tracks/r1/bit_tracks.js',
  '../../../js/bit_tracks/r1/bit_samp_draw.js',

];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    
    const song_0 = `
    
        4, 2.00;
        0, 0.25;
        5, 0.25;
        5, 0.25;
        5, 0.25;
        7, 0.25;
        8, 0.25;
        7, 0.25;
        6, 0.25;
        4, 2.00;
        
        4, 2.00;
        0, 0.25;
        5, 0.25;
        5, 0.25;
        5, 0.25;
        7, 0.25;
        8, 0.25;
        7, 0.25;
        6, 0.25;
        4, 2.00;
        
        0,6;
        
        4, 2.00;
        0, 0.25;
        5, 0.25;
        5, 0.25;
        5, 0.25;
        7, 0.25;
        8, 0.25;
        7, 0.25;
        6, 0.25;
        4, 2.00;
        
    `;
    
    const song_1 = `
        0, 12;
        
        4, 2.00;
        0, 0.25;
        5, 0.25;
        5, 0.25;
        5, 0.25;
        7, 0.25;
        8, 0.25;
        7, 0.25;
        6, 0.25;
        4, 2.00;
        
        4, 2.00;
        0, 0.25;
        5, 0.25;
        5, 0.25;
        5, 0.25;
        7, 0.25;
        8, 0.25;
        7, 0.25;
        6, 0.25;
        4, 2.00;
        
    `;
    
    const total_secs = 24.0;
    
    
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);


    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: 'pulse_1bit',
                octive: 1,
                mode: 'notes',
                notes: Bit_tracks.song_to_notenums(song_0, 32, 0.2, 'zero')
            },
            {
                waveform: 'pulse_1bit',
                octive: 3,
                mode: 'notes',
                notes: Bit_tracks.song_to_notenums(song_1, 32, 0.2, 'zero')
            },
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
            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.50 );
        },
        secs: total_secs
    });

    // display objects for audio sample arrays for tracks and main final display
    sud.track_disp_opt = DSD.create_disp_options(sud.tracks, sound, { line_width: 3, midline_style: '#444400' });

    // set vg sm.frameMax to frames value of sound object
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
    const sound = sud.sound;

    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // draw sample data for 1bit tracks, and 16bit mix
    DSD.draw_tracks(ctx, sud.tracks, sud.track_disp_opt);
    DSD.draw( ctx, sound.array_frame, sud.track_disp_opt.mix, sm.per, 'final 16-bit mix' );

    // top display info
    DSD.draw_info(ctx, sound, sm, '#ffffff', 30);

};

