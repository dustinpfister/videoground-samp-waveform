/*
 *  music_roll.js r0 - for videoground-samp-waveform
 *
 *
 */
 
(function(){

    const Music_roll = {};
    
    // loose empty string helper
    const loose_empty = (str) => {
       return str != '';
    };
    
    // convert letters to freq numbers in hertz
    const array_notes = 'c,c#,d,d#,e,f,f#,g,g#,a,a#,b'.split(',');
    const notefreq_by_indices = ( i_scale=4, i_note=5 ) => {
        const a = i_scale - 5;
        const b = i_note + 3;
        return 440 * Math.pow(2, a + b / 12);
    };

    // loop ahead function to help get d and n values for each object    
    const loop_ahead = (objects, line_index, track_index, key='freq', value=0) => {
        let i = line_index;
        const len = objects.length;
        let n = 0;
        while(i < len){
            if( objects[i][track_index][key] != value ){
                return n;
            }
            n += 1;
            i += 1;
        }
        return n;
    };
    
    // process count values for each object in form of 'n' and 'd' props to help figure out current alpha values
    const process_counts = (objects) => {
        const track_count = objects[0].length;
        const array_freq = new Array(track_count).fill(-1);
        const array_d = new Array(track_count).fill(-1);
        const len = objects.length;
        let i_line = 0;
        while(i_line < len){
            let i_track = 0;
            while(i_track < track_count){
                const obj = objects[i_line][i_track];
                const a = loop_ahead(objects, i_line, i_track, 'freq', obj.freq );
                if(obj.freq != array_freq[i_track]){
                    array_freq[i_track] = obj.freq;
                    array_d[i_track] = a;
                }
                obj.d = array_d[i_track];
                obj.n = obj.d - a;
        
                i_track += 1;
            }
            i_line += 1;
        }
    };
    
    // parse plain text format into an array of objects
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
