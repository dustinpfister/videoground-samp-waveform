/*
 *  nyquist_draw.js - from nyquist_frequency project in videoground-samp-waveform
 */
 
(function(){

    const Nyquist_waveforms = {};
    
    Nyquist_waveforms.pulse_cp = (samp, a_wave) => {
        const duty = samp.duty === undefined ? 0.5 : samp.duty;
        const max_points = samp.max_points === undefined ? 10000000 : samp.max_points;
        const a_cycle = samp.frequency * a_wave % 1;
        const cycle_points = Math.round( a_cycle * max_points) % max_points;
        const a_cp = cycle_points / max_points;
        if(a_cp >= duty){
            return samp.amplitude * 1;
        }
        return samp.amplitude * -1;
    };
    
    Nyquist_waveforms.sin_cp = (samp, a_wave) => {
        const a_cp_shift = samp.a_cp_shift === undefined ? 0 : samp.a_cp_shift;
        const max_points = samp.max_points === undefined ? 10000: samp.max_points;
        const a_cycle = samp.frequency * a_wave % 1;
        const cycle_points = Math.round( a_cycle * max_points) % max_points;
        const a_cp = (a_cp_shift + cycle_points / max_points) % 1;
        const n = Math.sin( Math.PI * 2 * a_cp ) * samp.amplitude;
        return n;
    };
    
    window.Nyquist_waveforms = Nyquist_waveforms;

}());
