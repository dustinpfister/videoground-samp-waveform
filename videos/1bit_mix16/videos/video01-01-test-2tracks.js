/*    video01-01-test-2tracks - form 1bit_mix16 in videoground-samp-waveform 
          * (done) I just want to get the basic idea working
          * (done) started working out a new waveform function for mixing
          * (done) I will still want to have a sample data disp each 1bit track

          * () start a bit_tracks.js file for the 1bit_mix16 project
          * () bit_tracks can be used to set up, and update tracks
          * () bit_tracks has custom pulse, noise, ect waveform functions
          * () bit_tracks contains code for defining music notation

          * () start a bit_tracks_mix.js file for the 1bit_mix16 project

          * () start a bit_tracks_draw.js file for the 1bit_mix16 project

 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_create/r0/samp_draw.js',
  '../../../js/samp_create/r0/waveforms/pulse.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){

    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    const TRACKS = [];

    TRACKS[0] = [

        0,0,1,0,2,0,3,0, 4,0,5,0,6,0,7,0, 8,0,0,0,0,0,0,0, 8,0,0,0,0,0,0,0,
        0,0,1,0,2,0,3,0, 4,0,5,0,6,0,7,0, 8,0,0,0,0,0,0,0, 8,0,0,0,0,0,0,0,
        0,0,1,0,2,0,3,0, 4,0,5,0,6,0,7,0, 8,0,0,0,0,0,0,0, 8,0,0,0,0,0,0,0,

        0,0,2,0,3,0,4,0, 5,0,6,0,7,0,8,0, 9,0,0,0,0,0,0,0, 10,0,0,0,0,0,0,0,
        0,0,2,0,3,0,4,0, 5,0,6,0,7,0,8,0, 9,0,0,0,0,0,0,0, 10,0,0,0,0,0,0,0,
        0,0,2,0,3,0,4,0, 5,0,6,0,7,0,8,0, 9,0,0,0,0,0,0,0, 10,0,0,0,0,0,0,0,

    ];

    TRACKS[1] = [

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

        waveform: (samp, a_wave) => {
            samp.tracks = samp.tracks || [];
            samp.amplitude = samp.amplitude === undefined ? 0.75 : samp.amplitude; 
            let n = 0;
            return ( samp.tracks[0] + samp.tracks[1] ) * (1 / 2) * samp.amplitude;
        },

        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {


            const ni0 = TRACKS[0][ Math.floor( TRACKS[0].length * a_sound2) ];
            fs.freq0 = ST.notefreq_by_indices(3, ni0);
            fs.amp0 = ni0 === 0 ? 0 : 1.0;

            const ni1 = TRACKS[1][ Math.floor( TRACKS[1].length * a_sound2) ];
            fs.freq1 = ST.notefreq_by_indices(1, ni1);
            fs.amp1 = ni1 === 0 ? 0 : 1.0;

            // set array frame tracks back to empty array
            sud.array_frame_tracks = [ [], [] ];

            return fs;

        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {


            const a_wave = a_sound * opt.secs % 1;

            const s0 = CS.WAVE_FORM_FUNCTIONS.pulse({ duty: 0.5, frequency: fs.freq0, amplitude: fs.amp0 }, a_wave );
            const s1 = CS.WAVE_FORM_FUNCTIONS.pulse({ duty: 0.5, frequency: fs.freq1, amplitude: fs.amp1 }, a_wave );

            sud.array_frame_tracks[0].push(s0);
            sud.array_frame_tracks[1].push(s1);

            return {
                tracks: [ s0, s1 ]
            };

        },
        secs: 6
    });


    // display objects for audio sample arrays for tracks and main final display
    sud.opt_frame_track0 = {
        w: 1200, h: 100, sy: 100, sx: 40, mode: 'raw', overlay_alpha: 0.4,
        boxStyle: '#444444', lineStyle: '#ffffff'
    };
    sud.opt_frame_track1 = {
        w: 1200, h: 100, sy: 250, sx: 40, mode: 'raw', overlay_alpha: 0.4,
        boxStyle: '#444444', lineStyle: '#ffffff'
    };
    sud.opt_frame = { w: 1200, h: 200, sy: 500, sx: 40, mode: sound.mode, overlay_alpha: 0.4, boxStyle: '#880000', lineStyle: '#ff4400' };


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
    // track 0
    DSD.draw_box(ctx, sud.opt_frame_track0, 0);
    DSD.draw_sample_data( ctx, sud.array_frame_tracks[0], sud.opt_frame_track0);

    // track 1
    DSD.draw_box(ctx, sud.opt_frame_track1, 0);
    DSD.draw_sample_data( ctx, sud.array_frame_tracks[1], sud.opt_frame_track1);


    // draw frame disp, for final 16bit mix
    DSD.draw( ctx, sound.array_frame, sud.opt_frame, 0, 'final 16-bit mix' );


    // top display info
    const alpha = sm.frame / ( sm.frameMax - 1);
    ctx.fillStyle = 'white';
    ctx.font = '25px courier';
    ctx.textBaseline = 'top';
    const disp_frame = sm.frame + '/' + sm.frameMax;
    const disp_time =  (sound.secs * alpha).toFixed(2) + ' / ' + sound.secs;
    ctx.fillText('frame: ' + disp_frame + ', seconds: ' + disp_time, 10, 10);

};

