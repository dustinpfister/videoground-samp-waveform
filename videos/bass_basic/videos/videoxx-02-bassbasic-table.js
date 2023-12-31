/*    video01-03-bassbasic-table - form bass_basic in videoground-samp-waveform 
          * trying out a table where I have a few freq at once
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_create/r0/samp_draw.js',
  '../../../js/samp_create/r0/waveforms/table_maxch.js',
  '../js/waveform_bass_basic.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);


    const sound = sud.sound = CS.create_sound({
        waveform : 'table_maxch',
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {
            //fs.freq = ST.notefreq_by_indices(3, 0);
            fs.notes_per_sec = 2;
            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const spf = opt.sound.samples_per_frame;
            const frame = Math.floor(i / spf);
            const a_sound2 = frame / (opt.secs * 30);
            const a_frame = (i % spf) / spf;

            const a_wave = ST.get_wave_alpha_totalsecs(a_sound, opt.secs) * fs.notes_per_sec % 1;
            //const a_note = samp.a_wave * fs.notes_per_sec % 1;

            return {
                a_wave: a_wave,
                maxch: 4,
                amplitude: 0.75,
                frequency: 1,
                table: [
                    {  a_wave: a_wave, waveform: 'bass_basic', frequency: ST.notefreq_by_indices(2, 5), amplitude: 1.0 },
                    {  a_wave: a_wave, waveform: 'bass_basic', frequency: ST.notefreq_by_indices(3, 11), amplitude: 1.0 },
                    {  a_wave: a_wave, waveform: 'bass_basic', frequency: ST.notefreq_by_indices(5, 0), amplitude: 0.25 }
                ]
            };
        },
        secs: 3
    });
    sud.opt_frame = { w: 1200, h: 420, sy: 150, sx: 40, mode: sound.mode, overlay_alpha: 0.5 };
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
    // draw frame disp, and info
    DSD.draw( ctx, sound.array_frame, sud.opt_frame, 0, 'sample data ( current frame )' );
    DSD.draw_info(ctx, sound, sm);
};

