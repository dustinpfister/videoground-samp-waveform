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
                waveform: 'pulse_1bit',
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

    const get_note_alpha_pad = () => {


    }

    const song0 = create_song({
        bps: 8,
        total_beats: 0,
        index:0,
        notes : [
            {  pitch: 240, beats: 4  },
            {  pitch: 0, beats: 4  }
        ]
    });


    const song1 = create_song({
        bps: 8,
        total_beats: 0,
        index:0,
        notes : [
            {  pitch: 0, beats: 4  },
            {  pitch: 240, beats: 4  }

/*
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
            {  pitch: 80, beats: 2  }

*/

        ]
    });

    console.log(song0.total_beats); 
    console.log(song1.total_beats); 

console.log( ST.get_alpha_sin(0.55, 1.0, 1) );

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

            

            sud.tracks.current[0].freq = (obj0.pitch / 2) * note_alpha;



            const obj1 = get_note( song1, a_sound );


            //let a2 = 1 - Math.abs(note_alpha - 0.5) / 0.5;

/*
            if(note_alpha < 0.25){
                a2 = ST.get_alpha_sin( note_alpha / 0.25, 2, 1); 
            }

            if(note_alpha >= 0.25 && note_alpha < 0.75){
                a2 = note_alpha;
            }


            if(note_alpha >= 0.75){
                a2 = ST.get_alpha_sin( 1 - (note_alpha - 0.75) / 0.25, 2, 1); 
            }
*/

            //const na_sin = ST.get_alpha_sin(a2, 1.0, 1);

            sud.tracks.current[1].freq = obj1.pitch;


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

