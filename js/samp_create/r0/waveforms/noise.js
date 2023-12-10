CS.WAVE_FORM_FUNCTIONS.noise = (samp, a_wave ) => {
    const b = 2 * Math.random() * samp.amplitude;
    return b - samp.amplitude;
};
