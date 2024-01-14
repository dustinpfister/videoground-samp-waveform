/*    video01-01-start - form vector3_start in videoground-samp-waveform 
          * Just want to work out what the basic idea of this is.
 */
//-------- ----------
// SCRIPTS
//-------- ----------
VIDEO.scripts = [
  '../../../js/samp_create/r0/samp_tools.js',
  '../../../js/samp_create/r0/samp_create.js',
  '../../../js/samp_create/r0/samp_draw.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){
    const sud = scene.userData;
    sm.renderer.setClearColor(0x000000, 0.25);

    const V3_DEFAULT = new THREE.Vector3( 0, 0, 1);

    const sound = sud.sound = CS.create_sound({
        waveform : (samp, a_wave)=>{
            const freq_min = samp.freq_min === undefined ? 40 : samp.freq_min;
            const freq_max = samp.freq_max === undefined ? 1000 : samp.freq_max;
            let v = samp.v3 || V3_DEFAULT;
            const amp = v.length();
            const pitch = ( v.y + 1 ) / 2;
            const freq = freq_min + ( freq_max - freq_min ) * pitch;
            return Math.sin(Math.PI * freq * a_wave) * amp * 0.75;
        },
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            const e = new THREE.Euler();
            e.x = Math.PI * 2 * a_sound2;

            const s = -1 + 2 * ( a_sound2 * 2 % 1 );

            fs.v3 = V3_DEFAULT.clone().applyEuler(e).normalize().multiplyScalar(s);

            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {

            samp.v3 = fs.v3;

            return samp;
        },
        secs: 5
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

    ctx.fillStyle = 'white';
    ctx.font = '30px courier';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

};

