/*
 *  music_roll.js r1 - for videoground-samp-waveform
 *  https://github.com/dustinpfister/videoground-samp-waveform/tree/master/js/music_roll
 *
 */
 
(function(){

    // regex
    const REGEX_CONTINUE = /^[-]+[-]$/; 
    const REGEX_ITRACK = /^[^\d]*(\d+)/;
    const REGEX_REMOVE_DASH = /\-/g;
    const REGEX_REMOVE_LETTER = /[a-zA-Z]/g;
    const REGEX_ISNEG= /[nN]/;

    // main music roll object to export
    const Music_roll = {};
    
    // loose empty string helper
    const loose_empty = (str) => {
       return str != '';
    };
    
    // convert letters to freq numbers in hertz
    const ARRAY_NOTES = 'c,c#,d,d#,e,f,f#,g,g#,a,a#,b'.split(',');
    
    // get note freq by scale and note indices
    const notefreq_by_indices = ( i_scale=4, i_note=5 ) => {
        const a = i_scale - 5;
        const b = i_note + 3;
        return 440 * Math.pow( 2, a + b / 12 );
    };
    
    // is continue pattern '-', '--', etc
    const is_continue = (a) => {
        if(a === '-'){
            return true;
        }
        return !!a.match( REGEX_CONTINUE );
    };
   
    // loop ahead function to help get d and n values for each object    
    const loop_ahead2 = (line_objects, line_index, track_index ) => {
        let i = line_index + 1;
        const len = line_objects.length;
        let n = 1;
        while(i < len){
            const obj = line_objects[i][track_index];
            if( !is_continue(obj.a0) ){
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
        const array_a = new Array(track_count).fill('--');
        const array_d = new Array(track_count).fill(1);
        const len = line_objects.length;
        let i_line = 0;
        while(i_line < len){
            let i_track = 0;
            while(i_track < track_count){
                const obj = line_objects[i_line][i_track];            
                const a = loop_ahead2(line_objects, i_line, i_track);
                if( !is_continue(obj.a0) || i_line === 0 ){
                    array_a[i_track] = obj.a0;
                    array_d[i_track] = a;
                }
                obj.d = array_d[i_track];
                obj.n = obj.d - a;
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
    
    const parse_roll_value = ( str, remove_letter=true ) => {    
        str = String(str);
        // if str starts with $, then parse everything after as string
        if(str[0] === '$'){
            return str.replace(/^\$/, '');
        }
        // if str starts with T or F then return true of false boolean
        if(str[0] === 'T'){
            return true;
        }
        if(str[0] === 'F'){
            return false;
        }        
        // should be a number value then
        let a = str.replace(REGEX_REMOVE_DASH, '');
        a = remove_letter ? a.replace(/[a-z]/g, '') : a;       
        const as_int = str.indexOf('.') === -1 ? true : false;
        
        const n = str.match(REGEX_ISNEG) ? -1 : 1;
        
        if(as_int){
            return parseInt( a ) * n;
        }
        return parseFloat( a ) * n;
    };
    
    const process_header_commands = (header) => {
        return (command) => {
            const cmd = command[0];
            const arg = command[1];
            if(cmd === 'lines_per_minute'){
                header.lines_per_minute = parseInt( arg );
            }
            if(cmd === 'title'){
                header.title = arg;
            }
            if(cmd === 'album'){
                header.album = arg;
            }
            if(cmd === 'artist'){
                header.artist = arg;
            }
            if(cmd.match(/track\d+/)){
                const i_track = parseInt( cmd.match(REGEX_ITRACK)[1] );
                const arr = arg.split('.');
                header['track' + i_track] = {
                    waveform: arr[0],
                    keys: arr.slice(1, arr.length)
                };
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
            title: 'none',
            album: '',
            artist: ''
        };
        while(i_ts < track_count){
            track_states[i_ts] = [0, 0, {} ];
            i_ts += 1;
        }
        const line_objects = process_raw_text(text, process_header_commands(header) )
        .map( ( str_line, i, arr ) => {
            const tracks = str_line.split(';').filter(loose_empty);
            return track_states.map( (arr_state, i_ts) => {
                const a = tracks[i_ts].split(' ').filter(loose_empty);
                // update freq 
                if( !is_continue( a[0] ) ){
                    let freq = 0;
                    // set by key and octive string such as c#3
                    const key_str = a[0].match(/[a-z]#?/);
                    const oct_str = a[0].match(/[0-9]/);      
                    if(key_str && oct_str){
                        freq = notefreq_by_indices( parseInt(oct_str), ARRAY_NOTES.indexOf(key_str[0]) );   
                    }
                    // allow for direct input of herts values
                    const freq_int = parse_roll_value( a[0], false );
                    if(String(freq_int) != 'NaN'){
                        freq = freq_int;
                    }         
                    arr_state[0] = Math.round( freq );
                }
                // update amp
                if( !is_continue( a[1] ) ){
                    arr_state[1] = parse_roll_value( a[1], true );
                }
                // update params
                if( a[2] ){
                    a[2].split(',').forEach((el, i) => {
                        let key_name = 'p' + i;
                        const track = header['track' + i_ts];
                        if(track){
                            key_name = track.keys[i] || key_name;       
                        }
                        if( !is_continue( el ) ){
                            arr_state[2][key_name] = parse_roll_value( el, true );
                        }
                    });
                }
                const line_obj = { frequency: arr_state[0], amplitude: arr_state[1], param: Object.assign({}, arr_state[2]), a0: a[0] };
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
    // give an song object, and a alpha value to get the current freq, amp, ect for each track
    Music_roll.play = (song, alpha=0) => {
        // alpha value sanatation
        alpha = alpha >= 1 ? 0.99999999 : alpha;
        alpha = alpha < 0 ? 0 : alpha;
        alpha = parseFloat(alpha);    
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
    // set Music_roll to window object
    window.Music_roll = Music_roll;
}());
