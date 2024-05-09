/*    video01-04-test-pulse-2a-note - form 1bit_waveforms in videoground-samp-waveform
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
# This is then a comment
>title='puse-2a-demo-tune'
>lines_per_minute=60
-- -;-- -;
c5 1;f2 1;
-- -;-- -;
-- -;d2 1;
-- -;d2 1;
-- -;f2 1;
-- -;-- -;
-- -;d2 1;
-- -;d2 1;
e5 1;f2 1;
-- -;-- -;
-- -;d2 1;
-- -;d2 1;
-- -;f2 1;
-- -;g2 1;
-- -;-- -;
-- -;-- -;
-- -;-- -;
-- -;-- -;
-- -;-- -;
d5 1;f2 1;
-- -;-- -;
-- -;d2 1;
-- -;d2 1;
-- -;f2 1;
-- -;-- -;
-- -;d2 1;
-- -;d2 1;
f5 1;f2 1;
f5 1;-- -;
e5 1;d2 1;
-- -;d2 1;
-- -;f2 1;
c5 1;g2 1;
-- -;-- -;
-- -;-- -;
-- -;-- -;
-- -;-- -;
`;

/*
    const song = `
# This is then a comment
>title='puse-2a-demo-tune'
>lines_per_minute=60
f3 1;90 1;
f3 1;-- -;
f3 1;-- -;
g3 1;90 1;
f3 1;-- -;
f3 1;-- -;
c3 1;90 1;
-- -;-- -;
-- -;-- -;
-- -;90 1;
d3 1;-- -;
c3 1;-- -;
d3 1;-- -;
e3 1;-- -;
f3 1;-- -;
-- -;-- -;
-- -;-- -;
f3 1;-- -;
-- -;-- -;
-- -;-- -;
`;
*/




    const song_obj = Music_roll.parse( song );

    // new pulse function
    const pulse_2a_note_1bit = (samp, a_wave) => {
        const d1 = samp.d1 === undefined ? 0.25 : samp.d1;
        const d2 = samp.d2 === undefined ? 0.75 : samp.d2;
        const a_note = samp.a_note === undefined ? 1 : samp.a_note;
        const a_cycle = samp.frequency * a_wave % 1;
        const n1 = Math.min(d1, d2);
        const n2 = Math.max(d1, d2);
        const range = Math.abs(n2 - n1);
        if( a_note > 0 && a_cycle >= n1 + range / 2 * ( 1 - a_note )  && a_cycle <= n2 - range / 2 * ( 1 - a_note ) ){
            return 1;
        }
        return 0;
    };

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: pulse_2a_note_1bit,
                mode: 'tone',
                desc: 'pulse_2a_note highs',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    d1: 0.35,
                    d2: 0.65,
                    a_note: 1
                }
            },
            {
                waveform: pulse_2a_note_1bit,
                mode: 'tone',
                desc: 'pulse_2a_note lows',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    d1: 0.15,
                    d2: 0.85,
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

