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
        count: 2,
        objects: [
            {
                //waveform: 'pulse_1bit',
                waveform: Bit_tracks.waveforms['pulse_1bit'],
                mode: 'tone',
                desc: 'highs',
                samp: {
                    duty: 0.50,
                    frequency: 120
                }
            },
            {
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'lows',
                samp: {
                    duty: 0.50,
                    frequency: 60
                }
            },
        ]
    });

    const get_total_beats = (song) => {
        return song.notes.reduce((acc, n) => {
            let b = parseInt( n.beats );
            b = String(b) === 'NaN' ? 0 : b;
            return acc + b;
        },0);
    };

    const set_notes_alphas = (song) => {
        if(!song.total_beats){
            song.total_beats = get_total_beats(song);
        } 
        song.notes.forEach( (obj, i) => {
            let b = parseInt( obj.beats );
            b = String(b) === 'NaN' ? 0 : b;
            let a = 0;
            if(i > 0){
                a = song.notes[i - 1].alpha;
            }
            song.notes[i].alpha_start = a;
            song.notes[i].alpha = a + b / song.total_beats;
        });
    };

    const create_song = (opt) => {
        const song = Object.assign({}, opt);
        set_notes_alphas(song);
        song.total_secs = Math.ceil(song.total_beats / song.bps);   
        return song;
    };


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


    const get_note_alpha = (a_sound, note) => {
        return ( a_sound - note.alpha_start ) / ( note.alpha - note.alpha_start );
    };

    const get_note_alpha_pad = (a_sound, note, pad_start = 0.05, pad_end) => {
        pad_end = pad_end === undefined ? 1 - pad_start : pad_end;
        const note_alpha = get_note_alpha(a_sound, note);
        let a2 = 0;
        if(note_alpha >= pad_start && note_alpha < pad_end){
            a2 = 1;
        }
        return a2;
    };

    const song0 = create_song({
        bps: 8,
        total_beats: 0,
        index:0,
        notes : [

            {  pitch: 0, beats: 4  },

            {  pitch: 0, beats: 24  },

            {  pitch: 0, beats: 2  },

            {  pitch: 250, beats: 2  },
            {  pitch: 270, beats: 2  },
            {  pitch: 290, beats: 2  },
            {  pitch: 310, beats: 2  },
            {  pitch: 330, beats: 2  },
            {  pitch: 360, beats: 2  },
            {  pitch: 380, beats: 2  },
            {  pitch: 400, beats: 2  },
            {  pitch: 420, beats: 2  },
            {  pitch: 440, beats: 2  },
            {  pitch: 460, beats: 2  },
            {  pitch: 480, beats: 2  },

            {  pitch: 0, beats: 2  },

            {  pitch: 0, beats: 42  },

            {  pitch: 0, beats: 24  },


            {  pitch: 0, beats: 24  },


            {  pitch: 290, beats: 8  },  // 24 beats
            {  pitch: 290, beats: 2  },
            {  pitch: 290, beats: 2  },
            {  pitch: 290, beats: 2  },
            {  pitch: 310, beats: 4  },
            {  pitch: 310, beats: 2  },
            {  pitch: 360, beats: 4  },

            {  pitch: 290, beats: 8  },  // 24 beats
            {  pitch: 290, beats: 2  },
            {  pitch: 290, beats: 2  },
            {  pitch: 290, beats: 2  },
            {  pitch: 360, beats: 4  },
            {  pitch: 360, beats: 2  },
            {  pitch: 420, beats: 4  },

            {  pitch: 0, beats: 6  }
        ]
    });


    const song1 = create_song({
        bps: 8,
        total_beats: 0,
        index:0,
        notes : [

            {  pitch: 0, beats: 4  },

            {  pitch: 80, beats: 2  },
            {  pitch: 90, beats: 2  },
            {  pitch: 100, beats: 2  },
            {  pitch: 110, beats: 2  },
            {  pitch: 120, beats: 2  },
            {  pitch: 130, beats: 2  },
            {  pitch: 140, beats: 2  },
            {  pitch: 150, beats: 2  },
            {  pitch: 160, beats: 2  },
            {  pitch: 170, beats: 2  },
            {  pitch: 180, beats: 2  },
            {  pitch: 190, beats: 2  },
            
            {  pitch: 0, beats: 2  },
 
            {  pitch: 0, beats: 24  },

            {  pitch: 0, beats: 2  },

            {  pitch: 80, beats: 24  },  // 42 beats
            {  pitch: 80, beats: 2  },
            {  pitch: 80, beats: 2  },
            {  pitch: 80, beats: 2  },
            {  pitch: 80, beats: 2  },
            {  pitch: 80, beats: 4  },
            {  pitch: 90, beats: 6  },

            {  pitch: 0, beats: 2 },    // 24 beats
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },


            {  pitch: 0, beats: 2 },    // 24 beats
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
     

            {  pitch: 0, beats: 2 },    // 24 beats
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },  

            {  pitch: 0, beats: 2 },    // 24 beats
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 0, beats: 2 },
            {  pitch: 80, beats: 2  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 80, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },
            {  pitch: 90, beats: 1  },       

            {  pitch: 0, beats: 6}


        ]
    });

    console.log( song0.total_beats / song0.bps ); 
    console.log( song1.total_beats / song1.bps ); 

    // create the main sound object using CS.create_sound
    const sound = sud.sound = CS.create_sound({
        waveform: Bit_tracks.waveforms.mix,
        for_frame : (fs, frame, max_frame, a_sound2, opt ) => {

            song0.index = 0;
            song1.index = 0;

            Bit_tracks.new_frame(sud.tracks, a_sound2);

            return fs;
        },
        for_sampset: ( samp, i, a_sound, fs, opt ) => {

            const obj0 = get_note( song0, a_sound );


            const note_alpha = get_note_alpha(a_sound, obj0);
            let a2 = 0;
            if(note_alpha >= 0.10 && note_alpha < 0.90){
                a2 = 1;
            }

            sud.tracks.current[0].freq = obj0.pitch * get_note_alpha_pad(a_sound, obj0, 0.15, 0.85);

            //sud.tracks.current[0].freq = (obj0.pitch / 2) * note_alpha;



            const obj1 = get_note( song1, a_sound );
            sud.tracks.current[1].freq = obj1.pitch * get_note_alpha_pad(a_sound, obj1, 0.10, 0.90);


if(i % 1470 === 0){



  //console.log(i, sud.tracks.current[0].freq);


}
            
            let a_wave = a_sound * opt.secs % 1;
            return Bit_tracks.for_sampset(sud.tracks, a_sound, opt.secs, 0.50, a_wave );
        },
        secs: song1.total_secs
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

