/*    video01-04-test-awave - form 1bit_mix16 in videoground-samp-waveform
 *        * testing out new a_wave argument when calling for sampset bit tracks method
 *        * testing out 'tone' mode
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
   
   
    const total_secs = 30;
    
    
    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'highs',
                samp: {
                    duty: 0.50,
                    frequency: 60
                }
            },
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'highs',
                samp: {
                    duty: 0.50,
                    frequency: 120
                    
                }
            }
        ]
    });

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            const a2 = a_sound2 * opt.secs % 1;
            const m = 1 + Math.floor(3 * a2);
            sud.tracks.objects[1].samp.frequnecy = 120 * m;

            Bit_tracks.new_frame(sud.tracks, a_sound2);

            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {

         
            let a_wave = a_sound * opt.secs % 1;
            if(a_sound >= 0.25){
                const a = (a_sound - 0.25) / 0.75;
                a_wave = a * (opt.secs * (1 + 4 * a )) % 1;
            }

            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.50, a_wave );
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
    
    //console.log(  '' );
    //console.log( sm.imageFolder );
    
    
    const result = CS.write_frame_samples(sud.sound, data_samples, sm.frame, sm.imageFolder, sm.isExport)
  
    if(result){
    
        return result.then(()=>{
            return CDB.write_text_samples(data_samples, sm.frame, sm.imageFolder);
        })
    
    }
    
    
    
    //return  CDB.write_text_samples(data_samples, sm.frame, sm.imageFolder)
    
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

