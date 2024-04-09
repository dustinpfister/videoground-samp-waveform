/*    video01-01-test-2tracks - form 1bit_mix16 in videoground-samp-waveform 
          * (done) I just want to get the basic idea working
          * (done) started working out a new waveform function for mixing
          * (done) I will still want to have a sample data disp each 1bit track
          * (done) start a bit_tracks.js file for the 1bit_mix16 project
          * (done) bit_tracks can be used to set up a new tracks object
          * (done) notes arrays for tracks objects
          * (done) bit_tracks has a function to create a sampset object
          * (done) have a Bit_tracks.waveform.mix waveform function
          * (done) new 1bit pulse waveform function for bit tracks
          * (done) start a bit_samp_draw.js file for the 1bit_mix16 project
          * (done) I will want version numbers for project js files as I will be making more videos
          * (done) I will want descriptions for tracks
          * (done) single draw tracks function
          * (done) start a create_disp_options function for tracks and main 16bit track
          * (done) DSD.create_disp_options should adjust height of each disp object based on count of tracks
          * (done) height and width arguments for DSD.create_disp_options
          * (done) update DSD.draw_info function for 1bit_mix16 project
          * (done) options object for DSD.create_disp_options
          * (done) style options for track and mix objects for DSD.create_disp_options
          * (done) track objects that allow for description arrays      
          * (done) updated note notation for tracks
          * (done) duty cycle arrays
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../js/bit_tracks/r0/bit_tracks.js',
  '../js/bit_tracks/r0/bit_samp_draw.js',

];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){


console.log( ST.notefreq_by_indices(6,4) );


    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    sud.tracks = Bit_tracks.create({
        count: 2,
        octives: [3, 1],
        duty: [0.50, 0.30 ]
    });

    sud.tracks.notes = [[],[]];
    
    sud.tracks.desc = ['highs', 'lows'],

    sud.tracks.notes[0] = [

        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
        3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, 3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, 3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, 3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, 
        4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4, 4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4, 4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4, 4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
        

    ];

    sud.tracks.notes[1] = [

        0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,7,7,7,7,0,7,7,7,7,0,7,7,7,7,0,
        0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,7,7,7,7,0,7,7,7,7,0,7,7,7,7,0,

        0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,7,7,7,7,0,7,7,7,7,0,7,7,7,7,0,
        0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,7,7,7,7,0,7,7,7,7,0,7,7,7,7,0,


        0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,7,7,7,7,0,7,7,7,7,0,7,7,7,7,0,
        0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,7,7,7,7,0,7,7,7,7,0,7,7,7,7,0,

        0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,7,7,7,7,0,7,7,7,7,0,7,7,7,7,0,
        0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,7,7,6,6,5,5,4,4,3,3,2,2,1,1,0, 0,7,7,7,7,0,7,7,7,7,0,7,7,7,7,0

    ];


    // 1 bit track sample data arrays used for display
    sud.array_frame_tracks = [];

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
        secs: 32
    });

    // display objects for audio sample arrays for tracks and main final display
    sud.track_disp_opt = DSD.create_disp_options(sud.tracks, sound, { });

    // set vg sm.frameMax to frames value of sound object
    sm.frameMax = sound.frames;

};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){

    const sud = scene.userData;

    // create the data samples
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

