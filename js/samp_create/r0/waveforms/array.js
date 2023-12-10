CS.WAVE_FORM_FUNCTIONS.array = (samp, a_wave ) => {
    const a = (a_wave * samp.frequency % 1) * samp.array.length;
    const i = Math.floor( a * 0.9999999999 );
    const n = samp.array[ i ];
    return n * samp.amplitude;
};
