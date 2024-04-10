/*    video01-02-test-notehelper - form 1bit_mix16 in videoground-samp-waveform
 *        * (done) start R1 of bit_tracks.js
 *        * (done) fix sum of tracks bug with mix waveform method in bit_tracks.js
 *        * () make create_note a method of bit_tracks.js R1
 *        * () simple string format for songs
 *        * () create_track_notes method for bit_tracks.js R1
 *        * () make a tune with 2 tracks
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

    const create_note = ( nums_per_sec=8, pitch=1, secs=1 ) => {
        const nums = [];
        let i = 0;
        const len= Math.ceil( nums_per_sec * secs );
        while(i < len ){
            nums.push( pitch );
            i += 1;
        }
        return nums;
    };
    
    const song = [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        [6, 1]       
    ];
    
    let track = [];
    song.forEach( (params) => {
        const arr = create_note(8, params[0], params[1]);
        track.push(arr)
    });
    
    track = track.flat();
    console.log(track.flat())
    

    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    sud.tracks = Bit_tracks.create({
        count: 1,
        octives: [3, 3],
        duty: [0.50, 0.5]
    });

    sud.tracks.notes = [[], []];
    
    sud.tracks.desc = ['highs'],

    sud.tracks.notes[0] = track.flat();


    // 1 bit track sample data arrays used for display
    sud.array_frame_tracks = [ ];

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
        secs: 6
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

