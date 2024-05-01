/*    video01-02-test-seedpulse - form 1bit_waveforms in videoground-samp-waveform 
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
    sm.renderer.setClearColor(0x000000, 0.25);
    
    const seedpulse_1bit = (samp, a_wave) => {
    
        samp.frequency = samp.frequency === undefined ? 80 : samp.frequency; 
        samp.imax = samp.imax === undefined ? 44100 : samp.imax;
    
        const i = Math.round( ( samp.frequency * a_wave % 1 ) * samp.imax );
        const a = i / samp.imax;
        
        
        const compo = samp.compo || [ [0.25, 0], [0.50, 2, 2], [1.00, 1] ];
        
        let i_compo = 0;
        while(i_compo < compo.length){
        
            const a_end = compo[i_compo][0];
            const part = compo[i_compo][1];
            
            if(a <= a_end){
            
                if(part === 2){
                    const seed_denom = compo[i_compo][2] === undefined ? 1: compo[i_compo][2];
                    const seed_start = compo[i_compo][3] === undefined ? 0: compo[i_compo][3];
                    const seed_delta = compo[i_compo][4] === undefined ? 1: compo[i_compo][4];
        
                    const n = THREE.MathUtils.seededRandom( seed_start + Math.floor(i / seed_denom ) * seed_delta );
                    return n >= 0.5 ? 1 : 0;
        
                }
                
                if(part === 1){
                    return 1;
                }
                
                return 0;
            
            }
            i_compo += 1;   
        }
        
        return 0;
    
    };

    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 1,
        objects: [
            {
                waveform: seedpulse_1bit,
                mode: 'tone',
                desc: 'seedpulse',
                samp: {
                    frequency: 30,
                    imax: 16,
                    compo: [ [ 0, 0 ], [0.40, 2, 5, 0, 1], [0.60, 1], [1.00, 2, 1, 0, 1] ]
                }
            }
        ]
    });

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            const samp = sud.tracks.objects[0].samp;

            
            if( a_sound2 < 0.25){
                const a = a_sound2 / 0.25;
                samp.imax = Math.floor( 16 + ( 496 ) * a );
                samp.frequency = 30;
            }


            if( a_sound2 >= 0.25 && a_sound2 < 0.75 ){
                const a = Samp_alphas.sin ( ( a_sound2 - 0.25 ) / 0.50, 1, 2);
                samp.imax = 512 - 256 * a;
                samp.frequency = 30;
            }

            if( a_sound2 >= 0.75){
                const a = ( a_sound2 - 0.75 ) / 0.25;
                samp.imax = 512 - Math.floor( 512 * a);
                samp.frequency = 30;
            }

            //samp.imax = Math.floor( 32 + 1000 * a_sound2);
            //samp.frequency = 30;
            //samp.imax = Math.floor( 32 + 1000 * a_sound2);
            //samp.frequency = 30; //30 + 10 * Math.sin( Math.PI * ( (1 + 31 * a_sound2 ) * a_sound2 % 1 ) );
            //samp.compo[3][3] = Math.pow(2, 1 + 16 * a_sound2) * -1;

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

