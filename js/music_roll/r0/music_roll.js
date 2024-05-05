/*
 *  music_roll.js r0 - for videoground-samp-waveform
 *
 *
 */
 
(function(){

    const Music_roll = {};
    
    const loose_empty = (str) => {
       return str != '';
    };
    
    const array_notes = 'c,c#,d,d#,e,f,f#,g,g#,a,a#,b'.split(',');
    
    const notefreq_by_indices = ( i_scale=4, i_note=5 ) => {
        const a = i_scale - 5;
        const b = i_note + 3;
        return 440 * Math.pow(2, a + b / 12);
    };
    
    
    const process_counts = (objects) => {
    
        const len = objects.length;
        let i = 0;
        while(i < len){
            const obj = objects[i];
            
            i += 1;
        }
    
    };
    
    
    // parse plain text format into an array
    Music_roll.parse = ( text='' ) => {
        const track_count = 2;
        const track_states = [];
        let i_ts = 0;
        while(i_ts < track_count){
            track_states[i_ts] = [0, 0, [] ];
            i_ts += 1;
        }
        const objects = text.split(/\n|\r\n/)
        .filter( loose_empty )
        .map( ( str_line, i, arr ) => {
            const tracks = str_line.split(';').filter(loose_empty)
            return track_states.map( (arr_state, i_ts) => {
                const a = tracks[i_ts].split(' ').filter(loose_empty);
                // update freq 
                if( !a[0].match(/-/)  ){
                    let freq = 0;
                    const key_str = a[0].match(/[a-z]#?/);
                    const oct_str = a[0].match(/[0-9]/);
                    if(key_str && oct_str){
                        freq = notefreq_by_indices( parseInt(oct_str), array_notes.indexOf(key_str[0]) );   
                    }       
                    arr_state[0] = freq;
                }
                // update amp
                if( !a[1].match(/-/)  ){    
                    arr_state[1] = parseInt(a[1]);
                }
                return { freq: arr_state[0], amp: arr_state[1], param: arr_state[2] };
            });
        });
        
        process_counts(objects);
        
        return objects;
    };
    
    
    window.Music_roll = Music_roll;

}());
