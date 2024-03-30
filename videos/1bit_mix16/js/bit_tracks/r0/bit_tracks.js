/*
 *  bit_tracks.js for the 1bit_mix16 project of videoground-samp-waveform
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
            let n = 0;
            return ( samp.tracks[0] + samp.tracks[1] ) * (1 / count) * samp.amplitude;
        }
    };
    
    // create a bit tracks object
    Bit_tracks.create = (opt) => {
        opt = opt || {};
        const tracks = {
            count: opt.count === undefined ? 1 : opt.count,
            octives: opt.octives || [1],
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
            const NOTES = tracks.notes[i]
            let ni = 0;
            if(NOTES){
                ni = NOTES[ Math.floor( NOTES.length * a_sound) ];
            }
            tracks.current.push({
                freq: ST.notefreq_by_indices(tracks.octives[i], ni),
                ni: ni,
                amp: ni === 0 ? 0 : 1
            });  
            tracks.samples.push([]);
            i += 1;
        }
    };
    
    // create a sampset object for the final waveform function that will be used
    Bit_tracks.for_sampset = (tracks, a_sound=0, secs=1 ) => {
        const t = [];
        const a_wave = a_sound * secs % 1;
        let ti = 0;
        const len = tracks.count;
        while(ti < len){
            const cur = tracks.current[ti]; 
            const s0 = Bit_tracks.waveforms.pulse_1bit({ duty: 0.5, frequency: cur.freq, ni: cur.ni  }, a_wave );
            tracks.samples[ti].push(s0);
            t.push(s0);
            ti += 1;
        }
        return {
            amplitude: 0.75,
            tracks: t
        };
    };
    
    window.Bit_tracks = Bit_tracks;

}());
