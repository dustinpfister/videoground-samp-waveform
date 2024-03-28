
(function(){

    const Bit_tracks = {};
    
    // create a bit tracks object
    Bit_tracks.create = (opt) => {
    
        opt = opt || {};
        
        return {
        
            tracks: []
        
        };
    
    };


    window.Bit_tracks = Bit_tracks;

}());
