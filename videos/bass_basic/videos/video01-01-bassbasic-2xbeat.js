/*    video01-01-bassbasic-2xbeat - form bass_basic in videoground-samp-waveform 
          * just get the basic idea of the waveform working
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_create/r0/samp_draw.js',
  '../js/waveform_bass_basic.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);


    const sound = sud.sound = CS.create_sound({
        waveform : 'bass_basic',
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            fs.notes_per_sec = 2;

const note_total = opt.secs * fs.notes_per_sec;
const note_ct = Math.floor( note_total * a_sound2);



const ni = 4 + Math.floor( 19 * note_ct / note_total );

console.log( note_ct, ni );

            fs.freq = ST.notefreq_by_indices(2, ni);

            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const spf = opt.sound.samples_per_frame;
            const frame = Math.floor(i / spf);
            const a_sound2 = frame / (opt.secs * 30);
            const a_frame = (i % spf) / spf;
            samp.a_wave = ST.get_wave_alpha_totalsecs(a_sound, opt.secs);

            samp.a_note = samp.a_wave * fs.notes_per_sec % 1;

            samp.amplitude = 0.75;
            samp.frequency = fs.freq;
            return samp;
        },
        secs: 30
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

