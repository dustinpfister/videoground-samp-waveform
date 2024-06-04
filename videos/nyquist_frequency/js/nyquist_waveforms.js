/*
 *  nyquist_draw.js - from nyquist_frequency project in videoground-samp-waveform
 */
 
(function(){

    const Nyquist_waveforms = {};
    
    Nyquist_waveforms.pulse_cp = (samp, a_wave) => {
        const duty = samp.duty === undefined ? 0.5 : samp.duty;
        const max_points = samp.max_points === undefined ? 100000 : samp.max_points;
        const a_cycle = samp.frequency * a_wave % 1;
        const cycle_points = Math.round( a_cycle * max_points) % max_points;
        const a_cp = cycle_points / max_points;
        if(a_cp >= duty){
            return samp.amplitude * 1;
        }
        return samp.amplitude * -1;
    };
    
    window.Nyquist_waveforms = Nyquist_waveforms;

}());
