/*    video01-06-test-note-alphas - form 1bit_mix16 in videoground-samp-waveform
 *        * working out just a simple example of note alphas
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
   
   
    
    
    
    // set up tracks object
    sud.tracks = Bit_tracks.create({
        count: 1,
        objects: [
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'lows',
                samp: {
                    duty: 0.50,
                    frequency: 60
                }
            }
        ]
    });


    const song = {
        bps: 8,
        total_beats: 0,
        index:0,
        notes : [
            {  pitch: 80, beats: 4  },
            {  pitch: 100, beats: 2  },
            {  pitch: 90, beats: 2  },

            {  pitch: 80, beats: 4  },
            {  pitch: 100, beats: 2  },
            {  pitch: 90, beats: 2  },

            {  pitch: 80, beats: 4  },
            {  pitch: 100, beats: 2  },
            {  pitch: 90, beats: 2  },

            {  pitch: 100, beats: 2  },
            {  pitch: 90, beats: 2  },
            {  pitch: 80, beats: 4  },



            {  pitch: 80, beats: 1  },
            {  pitch: 100, beats: 1  },
            {  pitch: 90, beats: 1  },

            {  pitch: 80, beats: 1  },
            {  pitch: 100, beats: 1  },
            {  pitch: 90, beats: 1  },

            {  pitch: 80, beats: 1  },
            {  pitch: 100, beats: 1  },

            {  pitch: 90, beats: 2  },

            {  pitch: 100, beats: 2  },
            {  pitch: 90, beats: 2  },
            {  pitch: 80, beats: 2  },


        ]
    }

    song.total_beats = song.notes.reduce((acc, n) => {
        let b = parseInt( n.beats );
        b = String(b) === 'NaN' ? 0 : b;
        return acc + b;
    },0);

    const notes_alphas = song.notes.reduce( (acc, obj, i) => {
        let b = parseInt( obj.beats );
        b = String(b) === 'NaN' ? 0 : b;
        let a = 0;
        if(i > 0){
            a = song.notes[i - 1].alpha;
        }
        song.notes[i].alpha = a + b / song.total_beats;
        return acc;
    }, [] );


    const get_note = (song, a_sound, index ) => {
        if(index != undefined){
            song.index = index;
        }
        let i = song.index;
        const len = song.notes.length;
        while(i < len){
            if(a_sound <= song.notes[i].alpha ){
                song.index = i;
                return song.notes[i];
            }
            i += 1;
        }
        return { pitch: 0, beats: 0 };
    };


    const total_secs = Math.ceil(song.total_beats / song.bps);

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            song.index = 0;

            Bit_tracks.new_frame(sud.tracks, a_sound2);

            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {


            const obj = get_note( song, a_sound );

            sud.tracks.current[0].freq = obj.pitch;
            

         
            let a_wave = a_sound * opt.secs % 1;
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
    
    return CS.write_frame_samples(sud.sound, data_samples, sm.frame, sm.imageFolder, sm.isExport);
    
    //const result = CS.write_frame_samples(sud.sound, data_samples, sm.frame, sm.imageFolder, sm.isExport)
    //if(result){
    //    return result.then(()=>{
    //        return CDB.write_text_samples(data_samples, sm.frame, sm.imageFolder);
    //    })
    //}
    
    
    
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

