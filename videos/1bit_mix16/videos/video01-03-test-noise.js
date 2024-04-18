/*    video01-02-test-notehelper - form 1bit_mix16 in videoground-samp-waveform
 *        * (done) work out a noise waveform function in R1 of bit_tracks.js
 *        * (done) I will want waveform arrays for tracks objects then
 *        * (done) have three tracks for lows, highs and noise
 *        * (done) I would like to make use of ni in noise_1bit
 *        * (done) I would like to make use of frequency in noise_1bit
 *        * (done) need to start a work new freq system for noise waveform
 *        * (done) addtional arguments for noise waveform that set the range in which the noise happens
 *        * (done) I would like a single array of waveform objects in place of all these arrays
 *        * (done) should have a new system for switching how freq is set when setting up a frame in bit tracks
 

 *        * () Bit_tracks.for_sampset should use a samp object that will change from one waveform to another
 *
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../js/bit_tracks/r1/bit_tracks.js',
  '../js/bit_tracks/r1/bit_samp_draw.js',

];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
   
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);
   
    // song tracks and total time
    const song_0 = `
        0, 1.00;
        1, 3.00;
        0, 1.00;
        5, 3.00;
        0, 1.00;
        10, 3.00;
        0, 3.00;
    `;
    
    const song_1 = `
        1, 5.00;
        2, 5.00;
        4, 5.00;
    `;
    
    const total_secs = 15.0;
    
    
    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: 'pulse_1bit',
                mode: 'notes',
                desc: 'highs',
                samp: {
                    frequnecy: 80
                },
                octive: 3,
                notes: Bit_tracks.song_to_notenums(song_0, 32, 0, 'zero')
            },
            {
                waveform: 'noise_1bit',
                mode: 'notes',
                desc: 'noise',
                notes: Bit_tracks.song_to_notenums(song_1, 32, 0, 'zero')
            }
        ],
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

