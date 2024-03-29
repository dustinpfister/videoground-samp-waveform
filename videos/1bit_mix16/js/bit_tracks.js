
(function(){

    const Bit_tracks = {};
    
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
                amp: ni === 0 ? 0 : 1.0
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
            const s0 = CS.WAVE_FORM_FUNCTIONS.pulse({ duty: 0.5, frequency: tracks.current[ti].freq, amplitude: tracks.current[ti].amp }, a_wave );
            tracks.samples[ti].push(s0);
            t.push(s0);
            ti += 1;
        }

        return {
            tracks: t
        };
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


    window.Bit_tracks = Bit_tracks;

}());
