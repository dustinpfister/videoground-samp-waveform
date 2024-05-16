/*    video01-01-nescover-megaman2-woodman - form 1bit_music_rolls in videoground-samp-waveform
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
# megaman2 woodman based on midi file found here: https://www.vgmusic.com/music/console/nintendo/nes/mm2-wood.mid
>title='Megaman 2 : Woodman Stage 1-bit-tracks > 16-bit final mix '
>lines_per_minute=700;
#
# measure 1; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
d-3 1;  0 0;
--- -;--- -;
--- -;--- -;
--- -;--- -;
  0 0;c-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
d-3 1;  0 0;
--- -;--- -;
d-3 1;--- -;
--- -;--- -;
  0 0;c-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 2; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
d-3 1;  0 0;
--- -;--- -;
d-3 1;--- -;
--- -;--- -;
--0 0;c-2 1;
--- -;--- -;
d-3 1;--- -;
--- -;--- -;
--0 0;  0 0;
--- -;--- -;
d-3 1;--- -;
--- -;--- -;
--0 0;c-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 3; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
d-3 1;  0 0;
--- -;--- -;
--- -;--- -;
--- -;--- -;
  0 0;c-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
d-3 1;  0 0;
--- -;--- -;
d-3 1;--- -;
--- -;--- -;
  0 0;c-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
#
# measure 4; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
d-3 1;g-2 1;
--- -;--- -;
d-3 1;g-2 1;
--- -;g-2 1;
  0 0;g-2 1;
--- -;--- -;
d-3 1;g-2 1;
--- -;--- -;
  0 0;f-2 1;
--- -;--- -;
d-3 1;f-2 1;
--- -;--- -;
  0 0;d-2 1;
--- -;--- -;
--- -;c-2 1;
--- -;--- -;
#
# started this whole thing out here:
# measure 5; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
c-5 1;--- -;
b-4 1;--- -;
a#4 1;--- -;
a-4 1;--- -;
g#4 1;--- -;
g-4 1;--- -;
f#4 1;--- -;
e#4 1;--- -;
e-4 1;--- -;
d#4 1;--- -;
d-4 1;--- -;
c#4 1;--- -;
c-4 1;--- -;
b-3 1;--- -;
b-4 1;e-3 1;
--- -;--- -;
#
#  measure 6; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;  0 0;
--- -;--- -;
b-4 1;e-3 -;
--- -;--- -;
  0 0;  0 0;
--- -;--- -;
--- -;--- -;
b-4 1;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
  0 0;--- -;
b-4 1;--- -;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
#
# measure 7;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
--- -;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;f#2 1;
#
# measure 8;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
a#4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
c#5 1;f#2 1;
--- -;-- -;
--- -;f#2 1;
--- -;f#2 1;
#
#  measure 9;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
a-4 1;g-2 1;
--- -;--- -;
c#5 1;g-2 1;
--- -;g-2 1;
#
# measure 10;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
b-4 -;g-2 1;
--- -;g-2 1;
a-4 -;g-2 1;
--- -;--- -;
b-4 -;e-2 1;
--- -;--- -;
#
# measure 11;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;--- -;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
c#5 1;e#2 1;
--- -;--- -;
#
# measure 12;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
b-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
a-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
g#4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
#
# measure 13;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
g#4 1;  0 0;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;g#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;--- -;
--- -;a-3 1;
--- -;--- -;
--- -;f#2 1;
--- -;--- -;
--- -;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
#
# measure 14;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
  0 0;--- 0;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
#
# measure 15;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;f#2 1;
#
# measure 16;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
c#5 -;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
#
# measure 17;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
a-4 1;g-2 1;
--- -;--- -;
c#5 1;g-2 1;
--- -;g-2 1;
#
# measure 18;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;g-2 1;
a-4 2;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;e-2 1;
#
# measure 19;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
c#5 1;--2 1;
--- -;e#2 1;
#
# measure 20;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
b-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
a-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
g#4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
#
# measure 21;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
g#4 1;  0 0;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;g#2 1;
--- -;--- -;
f#4 1;f#3 1;
--- -;--- -;
--- -;a-2 1;
--- -;--- -;
--- -;f#2 1;
--- -;--- -;
--- -;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
#
# measure 22;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
  0 0;  0 0;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
a-4 1;d-2 1;
--- -;--- -;
#
# measure 23;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;d-2 1;
--- -;d-2 1;
--- -;d-2 1;
--- -;--- -;
--- -;d-2 1;
--- -;--- -;
a-4 1;d-2 1;
--- -;--- -;
g#4 1;d-2 1;
--- -;d-2 1;
  0 0;d-2 1;
--- -;--- -;
a-4 1;d-2 1;
--- -;--- -;
#
# measure 24;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;d-2 1;
--- -;--- -;
f#4 1;d-2 1;
--- -;d-2 1;
  0 0;d-2 1;
--- -;--- -;
f#4 1;d-2 1;
--- -;--- -;
a-4 1;d-2 1;
--- -;--- -;
--- -;d-2 1;
--- -;d-2 1;
c#5 1;d-2 1;
--- -;--- -;
--- -;d-2 1;
--- -;--- -;
#
# measure 25;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
  0 0;e-2 1;
--- -;--- -;
a-4 1;e-2 1;
--- -;--- -;
#
# measure 26;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
e-4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
f#4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;--- -;
g#4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;--- -;
#
# measure 27;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
c-5 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
--- -;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;--- -;
c-5 1;e#2 1;
--- -;--- -;
b-4 1;e#2 1;
--- -;e#2 1;
  0 0;e#2 1;
--- -;--- -;
c-5 1;e#2 1;
--- -;--- -;
#
# measure 28;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;e#2 1;
--- -;--- -;
c-5 1;e#2 1;
--- -;e#2 1;
c-5 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;--- -;
a-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
c-5 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;--- -;
#
# it might be better to start this off with measure 29 if you want to loop
# measure 29; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
f#6 1;f#2 1;
e#6 1;f#2 1;
e-6 1;f#2 1;
d#6 1;--- -;
d-6 1;2#2 1;
c#6 1;--- -;
c-6 1;f#2 1;
b-5 1;f#2 1;
a#5 1;--- 0;
a-5 1;f#2 1;
g#5 1;f#2 1;
g-5 1;--- -;
f#5 1;f#2 1;
e#5 1;f#2 1;
c#5 1;e#3 1;
--- -;--- -;
#
#  measure 30; beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;  0 0;
--- -;--- -;
b-4 1;e-3 -;
--- -;--- -;
  0 0;  0 0;
--- -;--- -;
--- -;--- -;
b-4 1;--- -;
--- -;--- -;
--- -;--- -;
--- -;--- -;
  0 0;--- -;
b-4 1;--- -;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
#
# measure 31;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
--- -;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;f#2 1;
#
# measure 32;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
a#4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
c#5 1;f#2 1;
--- -;-- -;
--- -;f#2 1;
--- -;f#2 1;
#
#  measure 33;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
a-4 1;g-2 1;
--- -;--- -;
c#5 1;g-2 1;
--- -;g-2 1;
#
# measure 34;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
b-4 -;g-2 1;
--- -;g-2 1;
a-4 -;g-2 1;
--- -;--- -;
b-4 -;e-2 1;
--- -;--- -;
#
# measure 35;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;--- -;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
c#5 1;e#2 1;
--- -;--- -;
#
# measure 36;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
b-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
a-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
g#4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
#
# measure 37;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
g#4 1;  0 0;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;g#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;--- -;
--- -;a-3 1;
--- -;--- -;
--- -;f#2 1;
--- -;--- -;
--- -;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
#
# measure 38;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
  0 0;--- 0;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
#
# measure 39;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
a-4 1;f#2 1;
--- -;f#2 1;
#
# measure 40;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
  0 0;f#2 1;
--- -;--- -;
f#4 1;f#2 1;
--- -;f#2 1;
a-4 1;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
c#5 -;f#2 1;
--- -;--- -;
--- -;f#2 1;
--- -;f#2 1;
#
# measure 41;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
b-4 1;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
a-4 1;g-2 1;
--- -;--- -;
c#5 1;g-2 1;
--- -;g-2 1;
#
# measure 42;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
--- -;g-2 1;
--- -;g-2 1;
--- -;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;g-2 1;
a-4 2;g-2 1;
--- -;--- -;
b-4 1;g-2 1;
--- -;e-2 1;
#
# measure 43;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
c#5 1;--2 1;
--- -;e#2 1;
#
# measure 44;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
b-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
a-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
g#4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
#
# measure 45;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
g#4 1;  0 0;
--- -;--- -;
a-4 1;f#2 1;
--- -;--- -;
g#4 1;g#2 1;
--- -;--- -;
f#4 1;f#3 1;
--- -;--- -;
--- -;a-2 1;
--- -;--- -;
--- -;f#2 1;
--- -;--- -;
--- -;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
#
# measure 46;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;  0 0;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
  0 0;  0 0;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
--- -;--- -;
--- -;--- -;
b-4 1;e-2 1;
--- -;--- -;
a-4 1;d-2 1;
--- -;--- -;
#
# measure 47;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
--- -;--- -;
--- -;--- -;
--- -;d-2 1;
--- -;d-2 1;
--- -;d-2 1;
--- -;--- -;
--- -;d-2 1;
--- -;--- -;
a-4 1;d-2 1;
--- -;--- -;
g#4 1;d-2 1;
--- -;d-2 1;
  0 0;d-2 1;
--- -;--- -;
a-4 1;d-2 1;
--- -;--- -;
#
# measure 48;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;d-2 1;
--- -;--- -;
f#4 1;d-2 1;
--- -;d-2 1;
  0 0;d-2 1;
--- -;--- -;
f#4 1;d-2 1;
--- -;--- -;
a-4 1;d-2 1;
--- -;--- -;
--- -;d-2 1;
--- -;d-2 1;
c#5 1;d-2 1;
--- -;--- -;
--- -;d-2 1;
--- -;--- -;
#
# measure 49;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
b-4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
  0 0;e-2 1;
--- -;--- -;
a-4 1;e-2 1;
--- -;--- -;
#
# measure 50;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
e-4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
f#4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;--- -;
g#4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;e-2 1;
b-4 1;e-2 1;
--- -;--- -;
--- -;e-2 1;
--- -;--- -;
#
# measure 51;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
c-5 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
--- -;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;--- -;
c-5 1;e#2 1;
--- -;--- -;
b-4 1;e#2 1;
--- -;e#2 1;
  0 0;e#2 1;
--- -;--- -;
c-5 1;e#2 1;
--- -;--- -;
#
# measure 52;  beat 1; staff 1 = ch 0, staff 9 = ch 1
#
  0 0;e#2 1;
--- -;--- -;
c-5 1;e#2 1;
--- -;e#2 1;
c-5 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;--- -;
a-4 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;e#2 1;
c-5 1;e#2 1;
--- -;--- -;
--- -;e#2 1;
--- -;--- -;
#
# Ending silence
#
--- -;--- -;
--- -;--- -;
`;


    const song_obj = Music_roll.parse( song );

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 2,
        objects: [
            {
                waveform: 'pulse2a_1bit',
                mode: 'tone',
                desc: 'pulse2a_1bit highs',
                a_note_mode: 'sin',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    d1: 0.35,
                    d2: 0.65,
                    a_note: 1
                }
            },
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'pulse_1bit lows',
                a_note_mode: 'pad:15',
                samp: {
                    amplitude: 1,
                    frequency: 0,
                    duty: 0.5,
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

    return new Promise( (resolve, reject) => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
                resolve('we should be good')
        };
        const loader = new THREE.ImageLoader(manager);
        const image_error = (err) => {
            console.warn('image error.');
        };
        const url_subject = videoAPI.pathJoin(sm.filePath, 'img/video01-01-subject.png');
        const url_background = videoAPI.pathJoin(sm.filePath, 'img/video01-01-background.png');
        loader.load( url_subject, ( image ) => { sud.img_subject = image; }, undefined, image_error );
        loader.load( url_background, ( image ) => { sud.img_background = image; }, undefined, image_error );
    });

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
    ctx.drawImage( sud.img_background, 0, 0, canvas.width, canvas.height );

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
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
VIDEO.export_done = (sm) => {
    
    // commands used for video only, and video + audio
    // ffmpeg -framerate 30 -i frame-%06d.png -pix_fmt yuv420p raw.mp4
    // ffmpeg -framerate 30 -i frame-%06d.png -i video.wav -b:a 192k -pix_fmt yuv420p raw.mp4
    
    // Maybe use this feature to automate cleanup?
    // find frame-*.png -delete
    
    const in_file = videoAPI.pathJoin( sm.imageFolder, 'frame-%06d.png' );
    const in_file_audio = videoAPI.pathJoin( sm.imageFolder, 'video.wav' );
    const out_file = videoAPI.pathJoin( sm.imageFolder, 'raw.mp4' );
    const exec_line = 'ffmpeg -y -framerate 30 -i ' + in_file + ' -i ' + in_file_audio + ' -b:a 192k -pix_fmt yuv420p ' + out_file;
    const clean_line = 'find ' + videoAPI.pathJoin( sm.imageFolder, 'frame-*.png') + ' -delete';
    
    videoAPI.exec( exec_line )
    .then( (data) => {
        console.log( 'looks like that went well' );
        return videoAPI.exec(clean_line);
    })
    .then( (data) => {
        console.log('clean up is done');
        console.log(data)
    });
    
};

