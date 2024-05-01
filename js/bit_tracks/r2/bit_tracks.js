/*
 *  bit_tracks.js r2 - for the 1bit_mix16 project of videoground-samp-waveform
 *      * can set a freq of zero for 'tone' mode
 *      * a 1-bit waveform function returns a 0 or 1 only
 *      * make sure that values returned by a 1-bit waveform are converted to a 1 or zero if they are not one of those
 *      * merge waveform on top of mix
 */
 
(function(){

    const Bit_tracks = {};
    
    // waveform functions inclduing the final 16bit mix of 1bit tracks
    Bit_tracks.waveforms = {
        // pulse wave
        pulse_1bit : (samp, a_wave ) => {
            const duty = samp.duty === undefined ? 0.5 : samp.duty;
            const a = samp.frequency * a_wave % 1;
            if(a < duty){
                return  0;
            }
            return 1;
        },
        // noise wave
        noise_1bit : (samp, a_wave ) => {
            samp.seed_start = samp.seed_start || 0;
            samp.seed_delta = samp.seed_delta === undefined ? 1470 * 10 : samp.seed_delta;
            samp.alow = samp.alow === undefined ? 0.25 : samp.alow;
            samp.ahigh = samp.ahigh === undefined ? 0.75 : samp.ahigh;
            const seed = Math.round( samp.seed_start + samp.seed_delta * a_wave );
            const a = samp.frequency * a_wave % 1;
            const n = THREE.MathUtils.seededRandom( seed );
            if( a < samp.alow || a > samp.ahigh ){        
                return 0;
            }
            if( n < 0.5 ){
                return 0; 
            }
            return 1;
        },
        // mix the 1bit tracks when making a final 16bit+ mix in a way in which each track is scaled and then mixed
        // thus the final mix is not 'true' 1bit sound, but in a way it is as this is just many 1bit tracks played in parralle
        mix: (samp, a_wave) => {
            samp.tracks = samp.tracks || [];
            const count = samp.tracks.length;
            samp.amplitude = samp.amplitude === undefined ? 0.75 : samp.amplitude; 
            let sum = 0;
            let i = 0;
            while( i < count ){
                sum += samp.tracks[i];
                i += 1;
            } 
            return sum * (1 / count) * samp.amplitude;
        },
        // merge many 1-bit tracks to a final 16bit+ mix where we are still just bouncing between to amp ranges, thus this is 'true' 1bit sound.
        merge: (samp, a_wave) => {
            samp.tracks = samp.tracks || [];
            const count = samp.tracks.length;
            samp.amplitude = samp.amplitude === undefined ? 0.75 : samp.amplitude; 
            let n = -1;
            let i = 0;
            while( i < count ){
                if( samp.tracks[i] === 1){
                    n = 1;
                    break;
                }
                i += 1;
            } 
            return n * samp.amplitude;
        }
    };
    
    
    // create a bit tracks object
    Bit_tracks.create = (opt) => {
        opt = opt || {};
        
        const tracks = {
            count: opt.count === undefined ? 1 : opt.count,
            objects: [],
            current: [],
            samples: []
        };
        
        const opt_objects = opt.objects || [];
        
        let i_obj = 0;
        while( i_obj < tracks.count ){
        
            const opt_obj = opt_objects[i_obj] || {};
        
            const obj = Object.assign({
                waveform: 'pulse_1bit',
                mode: 'tone',
                desc: 'track ' + i_obj,
                samp: {
                    frequency: 0,
                    ni: 0
                },
                octive: 3,
                notes: []
            }, opt_obj);
            tracks.objects.push(obj);              
            i_obj += 1;
        }
        
        
        Bit_tracks.new_frame(tracks);
        return tracks;
    };
    
    // set up a tracks object to work with a new frame
    Bit_tracks.new_frame = (tracks, a_sound) => {
        tracks.samples = [];
        tracks.current = [];
        let i_obj = 0;
        while(i_obj < tracks.count){
        
            const obj = tracks.objects[i_obj];
            const samp = obj.samp === undefined ? {} : obj.samp;
            
            // 'tone' mode default
            let freq = samp.frequency === undefined ? 80 : samp.frequency;
            let amp = samp.amplitude === undefined ? 1 : samp.amplitude;
            
            /*
            let ni = 0, freq = 0;
            
            if(obj.mode === 'tone'){        
                freq = obj.samp.frequency === undefined ? 80 : obj.samp.frequency;
                ni = 1;                      
            }
            
            if(obj.mode === 'notes'){
                if(obj.notes){
                    ni = obj.notes[ Math.floor( obj.notes.length * a_sound) ];
                    freq = ni;
                }
                if(ni >= 1 && obj.waveform != 'noise_1bit'){
                    freq = Math.floor( ST.notefreq_by_indices(obj.octive, ni - 1) );
                }
            }
            */
            
            tracks.current.push({
                freq: freq,
                //ni: ni,
                //amp: ni === 0 || obj.samp.amplitude === 0 ? 0 : 1
                amp: amp
            });  
            tracks.samples.push([]);
            
            i_obj += 1;
        }
    };
    
    // create a sampset object for the final waveform function that will be used
    Bit_tracks.for_sampset = (tracks, a_sound=0, secs=1, amp=0.75, a_wave=undefined ) => {
        const t = [];
        
        if(a_wave === undefined){
            a_wave = a_sound * secs % 1;
        }
        
        let ti = 0;
        const len = tracks.count;
        while(ti < len){
            const cur = tracks.current[ti];
               
            const obj = tracks.objects[ti];
            
            // figure out freq value to use
            let freq = cur.freq; 
            let ni = cur.ni;
                 
            // final samp object to use with waveform function
            const samp = Object.assign({}, obj.samp, {
                frequency: freq, ni: ni
            });
            
            // create 1bit sample value
            let s_bit = 0;
            if( cur.amp === 1 ){
                let waveform = Bit_tracks.waveforms['pulse_1bit'];
                if(typeof obj.waveform === 'function'){
                    waveform = obj.waveform;
                }
                if(typeof obj.waveform === 'string'){
                    waveform = Bit_tracks.waveforms[ obj.waveform ];
                }  
                s_bit = waveform( samp, a_wave );
            }
            
            // make sure s_bit is 0 or 1
            if(typeof s_bit != 'number' || String(s_bit) === 'NaN' || s_bit < 0.5 ){
                s_bit = 0;
            }
            if(s_bit >= 0.5 ){
                s_bit = 1;
            }
            
            // convert to -1 to 1 format for tracks.samples, and t
            const s0 = -1 + 2 * s_bit;
            tracks.samples[ti].push( s0 );
            t.push(s0);
            
            ti += 1;
        }
        return {
            a_wave: a_wave,
            amplitude: amp,
            tracks: t
        };
    };
    /*
    // create a note for a notes array of a tracks object
    Bit_tracks.create_note = ( nums_per_sec=8, pitch=1, secs=1, fade=0.15, fade_mode='zero' ) => {
        const nums = [];
        let i = 0;
        const len = Math.ceil( nums_per_sec * secs );
        while(i < len ){
            const a_secs = i / len;
            const a_half = 1 - (Math.abs(0.5 - a_secs) / 0.5);
            let m = 1;
            if(fade_mode === 'zero'){
                m = a_half < fade ? 0 : 1;
            }
            if(fade_mode === 'lat'){
                m = a_half < fade ? a_half / fade : 1;
            }
            nums.push( Math.round( pitch  * m ) );
            i += 1;
        }
        return nums;
    };
    
    // parse a song string into an array
    const parse_song_string = (str) => { 
        return str
            .replace(/\n|\r|\r\n/g, '')
            .split(';')
            .map( (str) => {
                return str.trim().split(',');
            })
            .filter( (arr) => {
               return !!arr[0];
            })
            .map( (arr) => {        
                return [
                    parseInt( arr[0] || 0 ),
                    parseFloat( arr[1] || 0 )
                ];
            
            });    
    };

    // song string or array into note numbers
    Bit_tracks.song_to_notenums = ( song=[], nums_per_sec=64, fade=0.15, fade_mode='zero' ) => {
        let notenums = [];
        if(typeof song === 'string'){
            song = parse_song_string(song);
        }
        song.forEach( (params) => {
            const arr = Bit_tracks.create_note(nums_per_sec, params[0], params[1], fade, fade_mode);
            notenums.push(arr)
        });
        return notenums.flat();
    };
    */
    window.Bit_tracks = Bit_tracks;

}());
