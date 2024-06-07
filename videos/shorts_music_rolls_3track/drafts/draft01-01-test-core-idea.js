/*    draft01-01-test-core-idea - form shorts_3track in videoground-samp-waveform
 *        
 */
VIDEO.resmode = 6;
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
    '../../../js/bit_tracks/r2/bit_samp_draw.js',

    '../../../js/export_done/r0/export_done.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){

    const sud = scene.userData;

    const song = `
>title='test song for three tracks shorts'
>lines_per_minute=600;
#
# measure 1;
#
--- -;--- -;e-2 -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;e-2 -;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# measure 2;
#
--- -;--- -;b-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;c-2 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;f-2 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# measure 3;
#
--- -;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# measure 4;
#
--- -;--- -;b-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;c-2 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;f-2 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
`;


    const song_obj = Music_roll.parse( song );


    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: (samp, a_wave) => {

            return 0;

        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const array_samp = Music_roll.play(song_obj, a_sound);


if(i % 1470 === 0){

console.log(song_obj);
console.log(array_samp);

}

            return samp;

        },
        secs: Math.ceil( song_obj.total_secs )
    });

    // set vg sm.frameMax to frames value of sound object
    sm.frameMax = sound.frames;
};
//-------- ----------
// UPDATE
//-------- ----------
VIDEO.update = function(sm, scene, camera, per, bias){

    // update camera
    const z = -100 + 150 * per;

    camera.position.set( 0, 0, z );
    camera.lookAt( 0, 0, z + 10 );


    const sud = scene.userData;
    const data_samples = CS.create_frame_samples(sud.sound, sm.frame, sm.frameMax );
    return CS.write_frame_samples(sud.sound, data_samples, sm.frame, sm.imageFolder, sm.isExport);
};
//-------- ----------
// RENDER
//-------- ----------
VIDEO.render = function(sm, canvas, ctx, scene, camera, renderer){
    const sud = scene.userData;

    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0, canvas.width, canvas.height);


};

//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};
