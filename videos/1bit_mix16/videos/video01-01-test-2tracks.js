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
          * (done) start a bit_samo_draw.js file for the 1bit_mix16 project
          * (done) I will want version numbers for project js files as I will be making more videos
          * (done) I will want descriptions for tracks

          * () create draw options helper function for tracks and main 16bit track
          * () single draw tracks function

          * () will need better track objects that allow for description properties along with other values



          
          * () noise_1bit waveform function for bit tracks
          * () can set/change what waveform function to use on track by track basis



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

    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    sud.tracks = Bit_tracks.create({
        count: 2,
        octives: [3, 1]
    });

    console.log( sud.tracks );

    const TRACKS = [];

    sud.tracks.notes = [[],[]]

    sud.tracks.notes[0] = [

        0,0,1,0,2,0,3,0, 4,0,5,0,6,0,7,0, 8,0,0,0,0,0,0,0, 8,0,0,0,0,0,0,0,
        0,0,1,0,2,0,3,0, 4,0,5,0,6,0,7,0, 8,0,0,0,0,0,0,0, 8,0,0,0,0,0,0,0,
        0,0,1,0,2,0,3,0, 4,0,5,0,6,0,7,0, 8,0,0,0,0,0,0,0, 8,0,0,0,0,0,0,0,

        0,0,2,0,3,0,4,0, 5,0,6,0,7,0,8,0, 9,0,0,0,0,0,0,0, 10,0,0,0,0,0,0,0,
        0,0,2,0,3,0,4,0, 5,0,6,0,7,0,8,0, 9,0,0,0,0,0,0,0, 10,0,0,0,0,0,0,0,
        0,0,2,0,3,0,4,0, 5,0,6,0,7,0,8,0, 9,0,0,0,0,0,0,0, 10,0,0,0,0,0,0,0,

    ];

    sud.tracks.notes[1] = [

        1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,
        1,1,1,1,1,1,1,1,
        2,2,2,2,2,2,2,2,
        3,3,0,0,3,3,0,0,
        4,4,0,0,4,4,0,0

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
            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs);
        },
        secs: 6
    });


    // display objects for audio sample arrays for tracks and main final display

    sud.opt_frame_track0 = {
        w: 1200, h: 170, sy: 100, sx: 40, padx: 0, pady: -30, mode: 'raw', overlay_alpha: 0.4,
        boxStyle: '#444444', lineStyle: '#ffffff'
    };
    sud.opt_frame_track1 = {
        w: 1200, h: 170, sy: 330, sx: 40, padx:0, pady: -30, mode: 'raw', overlay_alpha: 0.4,
        boxStyle: '#444444', lineStyle: '#ffffff'
    };
    sud.opt_frame = {
       w: 1200, h: 150, sy: 550, sx: 40, padx: 0, pady: -30, mode: sound.mode, overlay_alpha: 0.4, 
       boxStyle: '#880000', lineStyle: '#ff4400'
    };


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

    // draw sample data for 1bit tracks
    DSD.draw( ctx, sud.tracks.samples[0], sud.opt_frame_track0, 0, 'track 0' );
    DSD.draw( ctx, sud.tracks.samples[1], sud.opt_frame_track1, 0, 'track 1' );

    // draw frame disp, for final 16bit mix
    DSD.draw( ctx, sound.array_frame, sud.opt_frame, sm.per, 'final 16-bit mix' );


    // top display info
    const alpha = sm.frame / ( sm.frameMax - 1);
    ctx.fillStyle = 'white';
    ctx.font = '25px courier';
    ctx.textBaseline = 'top';
    const disp_frame = sm.frame + '/' + sm.frameMax;
    const disp_time =  (sound.secs * alpha).toFixed(2) + ' / ' + sound.secs;
    ctx.fillText('frame: ' + disp_frame + ', seconds: ' + disp_time, 10, 10);

};

