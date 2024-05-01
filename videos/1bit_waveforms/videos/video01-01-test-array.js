/*    video01-01-test-array - form 1bit_waveforms in videoground-samp-waveform 
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_alphas/r0/samp_alphas.js',
  '../../../js/samp_debug/r0/samp_debug.js',
  '../../../js/bit_tracks/r2/bit_tracks.js',
  '../../../js/bit_tracks/r2/bit_samp_draw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
   
    const sud = scene.userData;

    // array abit waveform
    const array_1bit = (samp, a_wave) => {
        samp.array = samp.array || [0,1,1,1,1,1,0,1,0,1];
        const len_array = samp.array.length;
        const a = a_wave * samp.frequency % 1 ;
        let i_array = Math.floor( len_array * a );
        const n = samp.array[i_array];
        return n;
    };

    const create_seedrnd_1bit = (count=32, seed_start=0, seed_denom=1, seed_delta=1 ) => {
        let i = 0;
        const array = [];
        while(i < count){
            const n = THREE.MathUtils.seededRandom( seed_start + Math.floor(i / seed_denom ) * seed_delta );
            array.push( n >= 0.5 ? 1 : 0 );
            i += 1;
        }
        return array;
    };

    const array_cycle = ( samp, array_collection, alpha=0, count=1 ) => {
        const i_option = Math.floor( array_collection.length * ( alpha * count % 1 ) );
        samp.array = array_collection[i_option];
    };

    
    const array_seeded_random = [
        create_seedrnd_1bit(8,   0, 1, 1),
        create_seedrnd_1bit(16,  0, 1, 1),
        create_seedrnd_1bit(32,  0, 1, 1),
        create_seedrnd_1bit(64,  0, 1, 1),
        create_seedrnd_1bit(128, 0, 1, 1),
        create_seedrnd_1bit(256, 0, 1, 1),
    ];

    const array_literals = [
        [ 0,1,0,0,1,0,0,0, 1,0,0,0,0,1,0,0, 0,0,0,1,0,0,0,0, 0,0,1,1,1,1,1,0 ],
        [ 0,1,1,0,1,1,0,0, 1,1,0,0,0,1,1,0, 0,0,0,1,1,0,0,0, 0,0,1,1,1,1,1,0 ],
        [ 0,1,1,1,1,1,1,0, 1,1,1,0,0,1,1,1, 0,0,0,1,1,1,0,0, 0,0,1,1,1,1,1,0 ],
        [ 0,1,1,1,1,1,1,1, 1,1,1,1,0,1,1,1, 1,0,0,1,1,1,1,1, 0,0,1,1,1,1,1,0 ]
    ];

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: array_1bit,
                mode: 'tone',
                desc: 'array_seeded_random',
                samp: {
                    array: array_seeded_random[0],
                    amplitude: 1,
                    frequency: 30
                }
            },
            {
                waveform: array_1bit,
                mode: 'tone',
                desc: 'array_literals',
                samp: {
                    array: array_literals[0],
                    amplitude: 1,
                    frequency: 30
                }
            }
        ]
    });

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            let samp0 = sud.tracks.objects[0].samp;
            samp0.amplitude = 0;

            if(frame % 15 === 0){
                samp0.amplitude = 1;
            }

            array_cycle( samp0, array_seeded_random, a_sound2, 5 );
            array_cycle( sud.tracks.objects[1].samp, array_literals, a_sound2, 1 );

            Bit_tracks.new_frame(sud.tracks, a_sound2);
            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const sec_alpha = Samp_alphas.cell(i, 44100, 0);
            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, sec_alpha );
        },
        secs: 25
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

