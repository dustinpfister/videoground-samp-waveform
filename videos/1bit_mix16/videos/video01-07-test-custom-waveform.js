/*    video01-07-test-custom-waveform - form 1bit_mix16 in videoground-samp-waveform
 *        * testing out custom waveforms using R1 of bit tracks
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
    
    const grain_1bit = (samp, a_wave ) => {
        const a = samp.frequency * a_wave % 1;
        if(a > samp.alow && a < samp.ahigh){
            const a2 = (a - samp.alow) / ( 1 - ( 1 - samp.ahigh ) - samp.alow );
            const a3 = Math.sin( Math.PI * 1 * a2 );
            return Math.round(a3 * samp.grain) % samp.div === 0 ? 1 : -1;
        }
        return -1;
    };


    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: grain_1bit,
                mode: 'tone',
                desc: 'grain 2 to 60 - 30 hertz',
                samp: {
                    alow: 0,
                    ahigh: 1,
                    grain: 2,
                    div: 2,
                    frequency: 30
                }
            },
            {
                waveform: grain_1bit,
                mode: 'tone',
                desc: 'grain 20 - 30 to 120 hertz ',
                samp: {
                    alow: 0.20,
                    ahigh: 0.80,
                    grain: 20,
                    div: 4,
                    frequency: 1
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


            const samp0 = sud.tracks.objects[0].samp;
            samp0.grain = 2 + 58 * a_sound;

            const samp1 = sud.tracks.objects[1].samp;
            const a_freq = Math.sin( Math.PI * (a_sound * 8 % 1) );
            samp1.frequency = 30 + 90 * a_freq;
            
            let a_wave = a_sound * opt.secs % 1;
            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, a_wave );
        },
        secs: 30
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
    
    //const result = CS.write_frame_samples(sud.sound, data_samples, sm.frame, sm.imageFolder, sm.isExport)
    //if(result){
    //    return result.then(()=>{
    //        return CDB.write_text_samples(data_samples, sm.frame, sm.imageFolder);
    //    })
    //}
     
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

