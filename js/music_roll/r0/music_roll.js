/*
 *  music_roll.js r0 - for videoground-samp-waveform
 *  https://github.com/dustinpfister/videoground-samp-waveform/tree/master/js/music_roll
 *
 */
 
(function(){

    const REGEX_CONTINUE = /^-+/

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
    /*  
    const loop_ahead = (line_objects, line_index, track_index, key='frequency', value=0) => {
        let i = line_index;
        const len = line_objects.length;
        let n = 0;
        while(i < len){
            if( line_objects[i][track_index][key] != value ){
                return n;
            }
            n += 1;
            i += 1;
        }
        return n;
    };
    */
    
    
    // loop ahead function to help get d and n values for each object    
    const loop_ahead2 = (line_objects, line_index, track_index ) => {
        let i = line_index + 1;
        const len = line_objects.length;
        let n = 1;
        while(i < len){
            const obj = line_objects[i][track_index]; 
            //if( obj.a0 != '---' ){
            if( !obj.a0.match( REGEX_CONTINUE ) ){
                return n;
            }
            n += 1;
            i += 1;
        }
        return n;
    };
    
    // process count values for each object in form of 'n' and 'd' props to help figure out current alpha values
    const process_counts = (line_objects) => {
        const track_count = line_objects[0].length;
        //const array_freq = new Array(track_count).fill(-1);
        const array_a = new Array(track_count).fill('--');
        const array_d = new Array(track_count).fill(1);
        const len = line_objects.length;
        let i_line = 0;
        while(i_line < len){
            let i_track = 0;
            while(i_track < track_count){
            
                const obj = line_objects[i_line][i_track];
                
                //!!! using frequency as a way to find if the n and d values does not work so great
                // if I have two notes at the same frequency, so using the a0 prop might be better for now.
                // this will contain '--' if the not contines, else somehting else
                //const a = loop_ahead(line_objects, i_line, i_track, 'frequency', obj.frequency );
                //if(obj.frequency != array_freq[i_track]){
                //    array_freq[i_track] = obj.frequency;
                //    array_d[i_track] = a;
                //}
                //obj.d = array_d[i_track];
                //obj.n = obj.d - a;
                    
                const a = loop_ahead2(line_objects, i_line, i_track);  
                //if(obj.a0 != '---' || i_line === 0){
                if( !obj.a0.match(REGEX_CONTINUE) || i_line === 0){
                    array_a[i_track] = obj.a0;
                    array_d[i_track] = a;
                }
                obj.d = array_d[i_track];
                obj.n = obj.d - a;
                
                
                //console.log(a, obj.n + '/' + obj.d, obj.a0)
        
                i_track += 1;
            }
            i_line += 1;
        }
    };
    
    // get track count from raw text
    const process_raw_text = (text, for_command=()=>{} ) => {
        return text.split(/\n|\r\n/)
        .filter( loose_empty )
        .filter( ( line ) => { // filter out comments
            if(line.trim()[0] === '#'){
                return false;
            }
            return true;
        })
        .filter( ( line, i ) => { // filter out 'commands'
            if(line.trim()[0] === '>'){
                const command = line.trim().replace('>', '').split('=');
                for_command( command, line, i ); 
                return false;
            }
            return true;
        });  
    };
    
    const get_track_count = (text) => {
        return process_raw_text(text)[0].split(';').filter(loose_empty).length;
    };
    
    const process_header_commands = (header) => {
        return (command) => {
            if(command[0] === 'lines_per_minute'){
                header.lines_per_minute = parseInt( command[1] );
            }
            if(command[0] === 'title'){
                header.title = command[1];
            }     
        }
    };
    
    // parse plain text format into an array of line_objects
    Music_roll.parse = ( text='' ) => {
        const track_count = get_track_count(text);
        const track_states = [];
        let i_ts = 0;
        const header = {
            lines_per_minute: 120,
            title: 'none'
        };
        while(i_ts < track_count){
            track_states[i_ts] = [0, 0, [] ];
            i_ts += 1;
        }
        const line_objects = process_raw_text(text, process_header_commands(header) )
        .map( ( str_line, i, arr ) => {
            const tracks = str_line.split(';').filter(loose_empty)
            return track_states.map( (arr_state, i_ts) => {
                const a = tracks[i_ts].split(' ').filter(loose_empty);
                // update freq 
                if( !a[0].match(REGEX_CONTINUE)  ){
                    let freq = 0;
                    // set by key and octive string such as c#3
                    const key_str = a[0].match(/[a-z]#?/);
                    const oct_str = a[0].match(/[0-9]/);
                    
                    if(key_str && oct_str){
                        freq = notefreq_by_indices( parseInt(oct_str), array_notes.indexOf(key_str[0]) );   
                    }
                    // allow for direct input of herts values
                    const freq_int = parseInt( parseInt(a[0]) );
                    if(String(freq_int) != 'NaN'){
                        freq = freq_int;
                    }
                    
                    arr_state[0] = Math.round( freq );
                }
                // update amp
                if( !a[1].match(REGEX_CONTINUE)  ){    
                    arr_state[1] = parseInt(a[1]);
                }
                const line_obj = { frequency: arr_state[0], amplitude: arr_state[1], param: arr_state[2], a0: a[0] };
                return line_obj;
            });
        });
        process_counts(line_objects);
        // return main song object
        return Object.assign({}, {
            total_secs: line_objects.length / header.lines_per_minute * 60,
            line_objects: line_objects
        }, header);
    };
    
    // give an line_objects array, and a alpha value to get the current freq, amp, ect for each track
    Music_roll.play = (song, alpha=0) => {
        const line_objects = song.line_objects;
        const array_samp = [];
        const len = line_objects.length;
        const i_line = Math.floor(len * alpha);
        const a_line = len * alpha % 1;
        const array_tracks = line_objects[i_line];
        const track_count = line_objects[0].length;
        let i_track = 0;
        while(i_track < track_count){      
            const obj = array_tracks[i_track];
            const a_note = (obj.n + a_line) / obj.d;
            array_samp.push( Object.assign({}, obj, { a_note: a_note } ) );
            i_track += 1;
        }   
        return array_samp;
    };
    
    window.Music_roll = Music_roll;

}());
