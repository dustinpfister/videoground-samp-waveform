/*    video01-01-nescover-megaman2-woodman - form 1bit_music_rolls in videoground-samp-waveform
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
    '../../../js/bit_tracks/r2/bit_samp_draw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
   
    const sud = scene.userData;

    const song = `
# megaman2 woodman based on midi file found here: https://www.vgmusic.com/music/console/nintendo/nes/mm2-wood.mid
>title='Megaman 2 : Woodman Stage 1-bit-tracks > 16-bit final mix '
>lines_per_minute=600;
#
# Some opening silence
#
--- -;--- -;
--- -;--- -;
#
# started this out with:  measure 5; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
c-5 1;--- -;
b-4 1;--- -;
a#4 1;--- -;
a-4 1;--- -;
g#4 1;--- -;
g-4 1;--- -;
f#4 1;--- -;
e#4 1;--- -;
e-4 1;--- -;
d#4 1;--- -;
d-4 1;--- -;
c#4 1;--- -;
c-4 1;--- -;
b-3 1;--- -;
b-4 1;e-3 1;
--- -;-- -;
#
#  measure 6; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;  0 0;
--- -;--- -;
b-4 1;e-3 -;
--- -;--- -;
  0 0;  0 0;
--- -;--- -;
--- -;--- -;
b-4 1;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
  0 0;--- -;
b-4 1;--- -;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
#
# measure 7;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
--- -;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;f#2 1;
#
# measure 8;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
a#4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
c#5 1;f#2 1;
--- -;-- -;
--- -;f#2 1;
--- -;f#2 1;
#
#  measure 9;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
a-4 1;g-2 1;
--- -;--- -;
c#5 1;g-2 1;
--- -;g-2 1;
#
# measure 10;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
b-4 -;g-2 1;
--- -;g-2 1;
a-4 -;g-2 1;
--- -;--- -;
b-4 -;e-2 1;
--- -;--- -;
#
# measure 11;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;--- -;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
c#5 1;e#2 1;
--- -;--- -;
#
# measure 12;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
b-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
a-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
g#4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
#
# measure 13;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
g#4 1;  0 0;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;g#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;--- -;
--- -;a-3 1;
--- -;--- -;
--- -;f#2 1;
--- -;--- -;
--- -;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
#
# measure 14;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
  0 0;--- 0;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
#
# measure 15;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;f#2 1;
#
# measure 16;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
c#5 -;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
#
# measure 17;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
a-4 1;g-2 1;
--- -;--- -;
c#5 1;g-2 1;
--- -;g-2 1;
#
# measure 18;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 19;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 20;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 21;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 22;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 23;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 24;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 25;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 26;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 27;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 28;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# Ending silence
#
--- -;--- -;
--- -;--- -;
`;


    const song_obj = Music_roll.parse( song );

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: 'pulse2a_1bit',
                mode: 'tone',
                desc: 'pulse2a_1bit highs',
                a_note_mode: 'sin',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    d1: 0.35,
                    d2: 0.65,
                    a_note: 1
                }
            },
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'pulse_1bit lows',
                a_note_mode: 'pad:15',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    duty: 0.5,
                    a_note: 1
                }
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
            const array_samp = Music_roll.play(song_obj, a_sound);
            Bit_tracks.apply_music_roll(sud.tracks, array_samp);      
            const sec_alpha = Samp_alphas.cell(i, 44100, 0);
            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, sec_alpha );
        },
        secs: Math.ceil(song_obj.total_secs)
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

