/*
 *  bit_tracks.js r1 - for the 1bit_mix16 project of videoground-samp-waveform
 *      * 
 *
 */
 
(function(){

    const Bit_tracks = {};
    
    // waveform functions inclduing the final 16bit mix of 1bit tracks
    Bit_tracks.waveforms = {
        // pulse wave
        pulse_1bit : (samp, a_wave ) => {
            const duty = samp.duty === undefined ? 0.5 : samp.duty;
            const a = samp.frequency * a_wave % 1;
            const ni = samp.ni || 0;
            if(a < duty || ni === 0){
                return  -1; 
            }
            return 1;
        },
        // mix the 1bit tracks
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
            const n = sum * (1 / count) * samp.amplitude;
            return n;
        }
    };
    
    // create a bit tracks object
    Bit_tracks.create = (opt) => {
        opt = opt || {};
        const tracks = {
            count: opt.count === undefined ? 1 : opt.count,
            octives: opt.octives || [1],
            duty: opt.duty || [],
            desc: [],
            notes: [],
            current: [],
            samples: []
        };
        Bit_tracks.new_frame(tracks);
        return tracks;
    };
    
    // set up a tracks object to work with a new frame
    Bit_tracks.new_frame = (tracks, a_sound) => {
        tracks.samples = [];
        tracks.current = [];
        const c = tracks.count;
        let i = 0;
        while(i < c){
            const NOTES = tracks.notes[i];
            let ni = 0, freq = 0;
            if(NOTES){
                ni = NOTES[ Math.floor( NOTES.length * a_sound) ];
            }
            if(ni >= 1){
                freq = Math.floor( ST.notefreq_by_indices(tracks.octives[i], ni - 1) );
            }
            tracks.current.push({
                freq: freq,
                ni: ni,
                amp: ni === 0 ? 0 : 1
            });  
            tracks.samples.push([]);
            i += 1;
        }
    };
    
    // create a sampset object for the final waveform function that will be used
    Bit_tracks.for_sampset = (tracks, a_sound=0, secs=1, amp=0.75 ) => {
        const t = [];
        const a_wave = a_sound * secs % 1;
        let ti = 0;
        const len = tracks.count;
        while(ti < len){
            const cur = tracks.current[ti];
            const duty = tracks.duty[ti] || 0.5;
            const s0 = Bit_tracks.waveforms.pulse_1bit( { duty: duty, frequency: cur.freq, ni: cur.ni  }, a_wave );
            tracks.samples[ti].push( s0 );
            t.push(s0);
            ti += 1;
        }
        return {
            amplitude: amp,
            tracks: t
        };
    };
    
    // create a note for a notes array of a tracks object
    Bit_tracks.create_note = ( nums_per_sec=8, pitch=1, secs=1, fade=0 ) => {
        const nums = [];
        let i = 0;
        const len = Math.ceil( nums_per_sec * secs );
        while(i < len ){
            const a_secs = i / len;
            const a_half = 1 - (Math.abs(0.5 - a_secs) / 0.5);
            const m = a_half < fade ? a_half / fade : 1;
            nums.push( Math.round( pitch  * m) );
            i += 1;
        }
        return nums;
    };
    
    window.Bit_tracks = Bit_tracks;

}());
