/*    video01-08-test-sample-alphas - form 1bit_mix16 in videoground-samp-waveform
 *        * testing out an idea for 'sample alphas'
 *
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_debug/r0/samp_debug.js',
  '../../../js/bit_tracks/r1/bit_tracks.js',
  '../../../js/bit_tracks/r1/bit_samp_draw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
   
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);


    const get_sample_cell_alpha = (sample_index=0, cell_size=1470, offset=0) => {
        return ( sample_index + offset ) % cell_size / cell_size;
    };
    
    const get_sample_range_alpha = (sample_index=0, start_index=0, end_index=0) => {
        if( sample_index >= start_index && sample_index <= end_index ){
            const n = sample_index - start_index;
            const d = end_index - start_index;
            return n / d;
        }
        return 0;
    };


    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 1,
        objects: [
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'pulse',
                samp: {
                    duty: 0.5,
                    frequency: 8
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


            const sec_alpha = get_sample_cell_alpha(i, 44100, 0);
            const frame_alpha = get_sample_cell_alpha(i, 1470, 0);


            const r1_alpha = get_sample_range_alpha( i, Math.floor(opt.i_size * 0.10), Math.floor(opt.i_size * 0.35) );
            const r2_alpha = get_sample_range_alpha( i, Math.floor(opt.i_size * 0.50), Math.floor(opt.i_size * 0.90) );
            const a1 = ST.get_alpha_sin(r1_alpha, 1, 1);
            const a2 = ST.get_alpha_sin(r2_alpha, 1, 1);
            const samp0 = sud.tracks.objects[0].samp;
            samp0.frequency = 8 + ( 7 * a1 * -1) + ( 8 * a2 * 1 );

            
            let a_wave = frame_alpha;

if(i % 1000 === 0){


}


            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, a_wave );
        },
        secs: 10
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

