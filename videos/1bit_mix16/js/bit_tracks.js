
(function(){

    const Bit_tracks = {};
    
    // set up a tracks object to work with a new frame
    Bit_tracks.new_frame = (tracks) => {
    
        tracks.samples = [];
        const c = tracks.count;
        let i = 0;
        while(i < c){
            tracks.samples.push([]);
            i += 1;
        }
    
    }; 
    
    // create a bit tracks object
    Bit_tracks.create = (opt) => {
    
        opt = opt || {};
        
        const tracks = {
            count: opt.count === undefined ? 1 : opt.count,
            samples: []
        };
        
        Bit_tracks.new_frame(tracks);
        
        return tracks;
    
    };


    window.Bit_tracks = Bit_tracks;

}());
