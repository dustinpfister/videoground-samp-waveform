
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
