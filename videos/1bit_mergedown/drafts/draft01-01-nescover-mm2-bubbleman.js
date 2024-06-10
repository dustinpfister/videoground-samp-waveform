/*    draft01-01-nescover-mm2-bubbleman - form 1bit_music_rolls in videoground-samp-waveform
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
    '../../../js/bit_tracks/r2/bit_samp_draw.js',
    '../../../js/export_done/r0/export_done.js'
];
//-------- ----------
// INIT
//-------- ----------
VIDEO.init = function(sm, scene, camera){

    // set clear color for three.js renderer
    sm.renderer.setClearColor(0x000000, 0);

    camera.far = 50;
    camera.updateProjectionMatrix()

    // starting a new visual thing for this
    const grid = new THREE.GridHelper(200, 60, 0xffffff, 0xffffff );
    grid.position.y = -2;
    grid.material.linewidth = 4;
    scene.add(grid);

    const grid2 = new THREE.GridHelper(200, 60, 0xffffff, 0xffffff );
    grid2.position.y = 2;
    grid2.material.linewidth = 4;
    scene.add(grid2);

   
    const sud = scene.userData;

    const song = `
# megaman2 bubbleman based on midi file found here: https://www.vgmusic.com/music/console/nintendo/nes/by-bubbleman.mid
>title='Megaman 2 : Bubbleman Stage 1-bit-tracks > 16-bit final mix '
>lines_per_minute=650;
#
# opening silence
#
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# measure 1; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;e-5 1;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;f-5 1;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;g-5 1;--- -;
--- -;--- -;--- -;
c-4 1;e-5 1;--- -;
--- -;--- -;--- -;
#
# measure 2; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;--- -;--- -;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
#
# measure 3; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;d-5 1;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
b-3 1;d-5 1;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
g#3 1;e-5 1;--- -;
--- -;--- -;--- -;
b-3 1;b-4 1;--- -;
--- -;--- -;--- -;
#
# measure 4; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;--- -;--- -;
--- -;--- -;--- -;
b-2 1;--- -;--- -;
--- -;--- -;--- -;
  0 0;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
b-2 1;--- -;--- -;
--- -;--- -;--- -;
b-2 1;--- -;--- -;
--- -;--- -;--- -;
  0 0;--- -;e-2 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# measure 5; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;e-5 1;a-2 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;a-2 1;
c-4 1;f-5 1;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;g-5 1;--- -;
--- -;--- -;--- -;
c-4 1;e-5 1;--- -;
--- -;--- -;--- -;
#
# measure 6; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;--- -;--- -;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
c-4 1;--- -;a-2 1;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;c-2 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
#
# measure 7; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;d-5 1;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
b-3 1;d-5 1;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
g#3 1;e-5 1;--- -;
--- -;--- -;--- -;
b-3 1;b-4 1;--- -;
--- -;--- -;--- -;
#
# measure 8; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;--- -;e-3 1;
--- -;--- -;--- -;
b-2 1;--- -;e-3 1;
--- -;--- -;--- -;
  0 0;--- -;  0 0;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
b-2 1;--- -;e-3 1;
--- -;--- -;--- -;
b-2 1;--- -;e-3 1;
--- -;--- -;--- -;
--- 0;--- -;--- 0;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# measure 9; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;  0 0;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 10; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;  0 0;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 11; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;--- 0;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
g#3 1;--- -;  0 0;
--- -;--- -;--- -;
b-3 1;--- -;e-2 1;
--- -;--- -;--- -;
#
# measure 12; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;--- 0;e-2 1;
--- -;--- -;--- -;
b-2 1;--- -;--- -;
--- -;--- -;--- -;
  0 0;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
b-2 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;--- -;e-2 1;
--- -;--- -;--- -;
  0 0;--- -;  0 0;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
#
# measure 13; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;  0 0;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 14; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;  0 0;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 15; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;--- 0;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
g#3 1;--- -;  0 0;
--- -;--- -;--- -;
b-3 1;--- -;e-2 1;
--- -;--- -;--- -;
#
# measure 16; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;--- 0;e-2 1;
--- -;--- -;--- -;
b-2 1;--- -;--- -;
--- -;--- -;--- -;
  0 0;--- -;  0 0;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
b-2 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;--- -;e-2 1;
--- -;--- -;--- -;
  0 0;--- -;  0 0;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
#
# measure 17; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;c-5 1;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;d-5 1;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;e-5 1;a-1 1;
--- -;--- -;--- -;
#
# measure 18; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;d-5 1;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;c-5 1;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;d-5 1;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 19; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
d-3 1;b-4 1;g-1 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g-3 1;c-5 1;  0 0;
--- -;--- -;--- -;
d-3 1;b-4 1;g-1 1;
--- -;--- -;--- -;
b-3 1;--- -;  0 0;
--- -;--- -;--- -;
d-3 1;a-4 1;g-1 1;
--- -;--- -;--- -;
g-3 1;--- -;  0 0;
--- -;--- -;--- -;
b-3 1;g-4 1;g-1 1;
--- -;--- -;--- -;
#
# measure 20; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
d-3 1;--- -;g-1 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g-3 1;--- -;--- -;
--- -;--- -;--- -;
d-3 1;g-5 1;g-1 1;
--- -;--- -;--- -;
b-3 1;--- -;  0 0;
--- -;--- -;--- -;
d-3 1;--- -;g-1 1;
--- -;--- -;--- -;
g-3 1;f-5 1;  0 0;
--- -;--- -;--- -;
b-3 1;--- -;g-1 1;
--- -;--- -;--- -;
#
# measure 21; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
c-3 1;e-5 1;f-1 1;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
f-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-3 1;--- -;f-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-3 1;d-5 1;f-1 1;
--- -;--- -;--- -;
f-3 1;c-5 1;  0 0;
--- -;--- -;--- -;
a-3 1;g-5 1;f-1 1;
--- -;--- -;--- -;
#
# measure 22; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
c-3 1;--- -;f-1 1;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
f-3 1;f-5 1;--- -;
--- -;--- -;--- -;
c-3 1;e-5 1;f-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-3 1;a-5 1;f-1 1;
--- -;--- -;--- -;
f-3 1;--- -;  0 0;
--- -;--- -;--- -;
a-3 1;--- -;f-1 1;
--- -;--- -;--- -;
#
# measure 23; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;g#5 1;e-1 1;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;--- -;e-1 1;
--- -;--- -;--- -;
g#3 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;e-5 1;e-1 1;
--- -;--- -;--- -;
e-3 1;g#5 1;  0 0;
--- -;--- -;--- -;
g#3 1;b-5 1;e-1 1;
--- -;--- -;--- -;
#
# measure 24; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;--- -;e-1 1;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
b-2 1;--- -;e-1 1;
--- -;--- -;--- -;
g#3 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;--- -;e-1 1;
--- -;--- -;--- -;
e-3 1;--- -;  0 0;
--- -;--- -;--- -;
g#3 1;--- -;e-1 1;
--- -;--- -;--- -;
#
# measure 25; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-5 1;  0 0;a-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;a-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;f-1 1;
--- -;--- -;--- -;
#
# measure 26; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
  0 0;  0 0;  0 0;
--- -;--- -;--- -;
d-5 1;--- -;f-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
a-4 1;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;--- -;
--- -;--- -;--- -;
#
# measure 27; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-5 1;  0 0;f-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;f-1 1;
--- -;--- -;--- -;
g-5 1;--- -;f-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
f-5 1;--- -;f-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
e-5 1;--- -;g-1 1;
--- -;--- -;--- -;
#
# measure 28; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
--- -;  0 0;--- -;
--- -;--- -;--- -;
d-5 1;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;g-1 1;
--- -;--- -;--- -;
c-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;g-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
  0 0;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# measure 29; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-5 1;  0 0;a-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;f-1 1;
--- -;--- -;--- -;
#
# measure 30; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
  0 0;  0 0;  0 0;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
a-4 1;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;--- -;
--- -;--- -;--- -;
#
# measure 31; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-5 1;  0 0;f-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;f-1 1;
--- -;--- -;--- -;
g-5 1;--- -;f-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
f-5 1;--- -;f-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
e-5 1;--- -;f-1 1;
--- -;--- -;--- -;
#
# measure 32; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
--- -;  0 0;e-1 1;
--- -;--- -;--- -;
g#5 1;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;e-1 1;
--- -;--- -;--- -;
b-5 1;--- -;e-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
d-6 1;--- -;e-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
e-6 1;--- -;--- -;
--- -;--- -;--- -;
#
# measure 33; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;  0 0;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 34; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;  0 0;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 35; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;--- 0;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
g#3 1;--- -;  0 0;
--- -;--- -;--- -;
b-3 1;--- -;e-2 1;
--- -;--- -;--- -;
#
# measure 36; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;--- 0;e-2 1;
--- -;--- -;--- -;
b-2 1;--- -;--- -;
--- -;--- -;--- -;
  0 0;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
b-2 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;--- -;e-2 1;
--- -;--- -;--- -;
  0 0;--- -;  0 0;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
#
# measure 37; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;  0 0;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 38; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;  0 0;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 39; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;--- 0;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
b-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;e-2 1;
--- -;--- -;--- -;
g#3 1;--- -;  0 0;
--- -;--- -;--- -;
b-3 1;--- -;e-2 1;
--- -;--- -;--- -;
#
# measure 40; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;--- 0;e-2 1;
--- -;--- -;--- -;
b-2 1;--- -;--- -;
--- -;--- -;--- -;
  0 0;--- -;  0 0;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
b-2 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;--- -;e-2 1;
--- -;--- -;--- -;
  0 0;--- -;  0 0;
--- -;--- -;--- -;
--- -;--- -;e-2 1;
--- -;--- -;--- -;
#
# measure 41; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;c-5 1;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;--- -;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;d-5 1;a-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-4 1;e-5 1;a-1 1;
--- -;--- -;--- -;
#
# measure 42; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
c-4 1;d-5 1;--- -;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;c-5 1;a-1 1;
--- -;--- -;--- -;
c-4 1;--- -;  0 0;
--- -;--- -;--- -;
e-3 1;--- -;a-1 1;
--- -;--- -;--- -;
a-3 1;d-5 1;  0 0;
--- -;--- -;--- -;
c-4 1;--- -;a-1 1;
--- -;--- -;--- -;
#
# measure 43; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
d-3 1;b-4 1;g-1 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g-3 1;c-5 1;  0 0;
--- -;--- -;--- -;
d-3 1;b-4 1;g-1 1;
--- -;--- -;--- -;
b-3 1;--- -;  0 0;
--- -;--- -;--- -;
d-3 1;a-4 1;g-1 1;
--- -;--- -;--- -;
g-3 1;--- -;  0 0;
--- -;--- -;--- -;
b-3 1;g-4 1;g-1 1;
--- -;--- -;--- -;
#
# measure 44; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
d-3 1;--- -;g-1 1;
--- -;--- -;--- -;
b-3 1;--- -;--- -;
--- -;--- -;--- -;
g-3 1;--- -;--- -;
--- -;--- -;--- -;
d-3 1;g-5 1;g-1 1;
--- -;--- -;--- -;
b-3 1;--- -;  0 0;
--- -;--- -;--- -;
d-3 1;--- -;g-1 1;
--- -;--- -;--- -;
g-3 1;f-5 1;  0 0;
--- -;--- -;--- -;
b-3 1;--- -;g-1 1;
--- -;--- -;--- -;
#
# measure 45; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
c-3 1;e-5 1;f-1 1;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
f-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-3 1;--- -;f-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-3 1;d-5 1;f-1 1;
--- -;--- -;--- -;
f-3 1;c-5 1;  0 0;
--- -;--- -;--- -;
a-3 1;g-5 1;f-1 1;
--- -;--- -;--- -;
#
# measure 46; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
c-3 1;--- -;f-1 1;
--- -;--- -;--- -;
a-3 1;--- -;--- -;
--- -;--- -;--- -;
f-3 1;f-5 1;--- -;
--- -;--- -;--- -;
c-3 1;e-5 1;f-1 1;
--- -;--- -;--- -;
a-3 1;--- -;  0 0;
--- -;--- -;--- -;
c-3 1;a-5 1;f-1 1;
--- -;--- -;--- -;
f-3 1;--- -;  0 0;
--- -;--- -;--- -;
a-3 1;--- -;f-1 1;
--- -;--- -;--- -;
#
# measure 47; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;g#5 1;e-1 1;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;--- -;e-1 1;
--- -;--- -;--- -;
g#3 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;e-5 1;e-1 1;
--- -;--- -;--- -;
e-3 1;g#5 1;  0 0;
--- -;--- -;--- -;
g#3 1;b-5 1;e-1 1;
--- -;--- -;--- -;
#
# measure 48; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
b-2 1;--- -;e-1 1;
--- -;--- -;--- -;
g#3 1;--- -;--- -;
--- -;--- -;--- -;
e-3 1;--- -;--- -;
--- -;--- -;--- -;
b-2 1;--- -;e-1 1;
--- -;--- -;--- -;
g#3 1;--- -;  0 0;
--- -;--- -;--- -;
b-2 1;--- -;e-1 1;
--- -;--- -;--- -;
e-3 1;--- -;  0 0;
--- -;--- -;--- -;
g#3 1;--- -;e-1 1;
--- -;--- -;--- -;
#
# measure 49; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-5 1;  0 0;a-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;a-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;f-1 1;
--- -;--- -;--- -;
#
# measure 50; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
  0 0;  0 0;  0 0;
--- -;--- -;--- -;
d-5 1;--- -;f-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
a-4 1;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;--- -;
--- -;--- -;--- -;
#
# measure 51; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-5 1;  0 0;f-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;f-1 1;
--- -;--- -;--- -;
g-5 1;--- -;f-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
f-5 1;--- -;f-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
e-5 1;--- -;g-1 1;
--- -;--- -;--- -;
#
# measure 52; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
--- -;  0 0;--- -;
--- -;--- -;--- -;
d-5 1;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;g-1 1;
--- -;--- -;--- -;
c-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;g-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
  0 0;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
#
# measure 53; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-5 1;  0 0;a-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;f-1 1;
--- -;--- -;--- -;
#
# measure 54; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
  0 0;  0 0;  0 0;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
d-5 1;--- -;g-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
a-4 1;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;--- -;
--- -;--- -;--- -;
#
# measure 55; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
e-5 1;  0 0;f-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
d-5 1;--- -;f-1 1;
--- -;--- -;--- -;
g-5 1;--- -;f-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
f-5 1;--- -;f-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
e-5 1;--- -;f-1 1;
--- -;--- -;--- -;
#
# measure 56; staff 2 = ch 0, staff 3 = ch 1, staff 4 = ch 2
#
--- -;  0 0;e-1 1;
--- -;--- -;--- -;
g#5 1;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;e-1 1;
--- -;--- -;--- -;
b-5 1;--- -;e-1 1;
--- -;--- -;--- -;
--- -;--- -;  0 0;
--- -;--- -;--- -;
d-6 1;--- -;e-1 1;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
e-6 1;--- -;--- -;
--- -;--- -;--- -;
#
# Ending silence
#
  0 0;  0 0;  0 0;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
--- -;--- -;--- -;
`;


    const song_obj = Music_roll.parse( song );

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 3,
        objects: [
            {
                waveform: 'pulse2a_1bit',
                mode: 'tone',
                desc: 'pulse2a_1bit Harp',
                a_note_mode: 'pad:15', //'sin',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    duty: 0.50,
                    d1: 0.35,d2: 0.65,
                    a_note: 1
                }
            },
            {
                waveform: 'pulse2a_1bit',
                mode: 'tone',
                desc: 'pulse2a_1bit Oboe',
                a_note_mode: 'sin', //'pad:15',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    //duty: 0.50,
                    d1: 0.35,d2: 0.65,
                    a_note: 1
                }
            },
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'pulse_1bit Bass',
                a_note_mode: 'pad:15',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    duty: 0.50,
                    //d1: 0.35,d2: 0.65,
                    a_note: 1
                }
            }

        ]
    });

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.merge,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {
            Bit_tracks.new_frame(sud.tracks, a_sound2);
            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            const array_samp = Music_roll.play(song_obj, a_sound);

            // can adjust track freq like this if I want
            //array_samp[0].frequency = Math.floor(array_samp[0].frequency * 0.30 );

            Bit_tracks.apply_music_roll(sud.tracks, array_samp);

            const sec_alpha = Samp_alphas.cell(i, 44100, 0);
            samp = Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.35, sec_alpha );
            return samp;

        },
        secs: Math.ceil( song_obj.total_secs )
    });

    // display objects for audio sample arrays for tracks and main final display
    sud.track_disp_opt = DSD.create_disp_options(sud.tracks, sound, {
        w: 600, h: 600, sx: 1279 - 650, sy: 120,
        line_width: 6, 
        midline_style: ['black', 'yellow'],
        track_styles: ['white', 'black'],
        mix_styles: ['red', 'yellow']
    });
    // set vg sm.frameMax to frames value of sound object
    sm.frameMax = sound.frames;

/*
    return new Promise( (resolve, reject) => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
                resolve('we should be good')
        };
        const loader = new THREE.ImageLoader(manager);
        const image_error = (err) => {
            console.warn('image error.');
        };
        const url_subject = videoAPI.pathJoin(sm.filePath, 'img/video01-02-subject.png');
        const url_background = videoAPI.pathJoin(sm.filePath, 'img/video01-02-background.png');
        loader.load( url_subject, ( image ) => { sud.img_subject = image; }, undefined, image_error );
        loader.load( url_background, ( image ) => { sud.img_background = image; }, undefined, image_error );
    });
*/

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
    const sound = sud.sound;

    // background
    if(sud.img_background){
        ctx.drawImage( sud.img_background, 0, 0, canvas.width, canvas.height );
    }


    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // draw scene object
    renderer.render(scene, camera);
    ctx.drawImage(renderer.domElement, 0,0, canvas.width, canvas.height);

    // draw sample data for 1bit tracks, and 16bit mix
    ctx.fillStyle = 'rgba(0,128,128,0.8)';


    ctx.fillRect(600,40, 660, 660);


    DSD.draw_tracks(ctx, sud.tracks, sud.track_disp_opt);
    DSD.draw( ctx, sound.array_frame, sud.track_disp_opt.mix, sm.per, 'final 16-bit mix' );

    // draw subject image
    if(sud.img_subject){
        ctx.drawImage( sud.img_subject, 100, 170, 400, 400 );
    }

    // top display info
    DSD.draw_info(ctx, sound, sm, '#ffffff', 30);

};

//-------- ----------
// EXPORT DONE
//-------- ----------
VIDEO.export_done = function(sm){
    return ED.to_mp4_audio_clean(sm);
};
