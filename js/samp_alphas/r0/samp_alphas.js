/*
 *  samp_alphas.js r0 - from videoground-samp-waveform
 *      * get sample cell alphas
 *      * get sample range alphas
 */
 
(function(){

    const Samp_alphas = {};
    
    Samp_alphas.cell = (sample_index=0, cell_size=1470, offset=0) => {
        return ( sample_index + offset ) % cell_size / cell_size;
    };
    
    Samp_alphas.range = (sample_index=0, start_index=0, end_index=0) => {
        if( sample_index >= start_index && sample_index <= end_index ){
            const n = sample_index - start_index;
            const d = end_index - start_index;
            return n / d;
        }
        return 0;
    };
    
    window.Samp_alphas = Samp_alphas;

}());
