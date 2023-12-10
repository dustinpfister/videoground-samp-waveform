CS.WAVE_FORM_FUNCTIONS.seedednoise = (samp, a_wave )=> {
    samp.values_per_wave = samp.values_per_wave === undefined ? 40 : samp.values_per_wave;
    samp.int_shift = samp.int_shift === undefined ? 0 : samp.int_shift;
    samp.freq_alpha = samp.freq_alpha === undefined ? 1 : samp.freq_alpha;
    const freq_raw = samp.frequency;
    const freq = freq_raw * samp.freq_alpha;
    const a = ( a_wave * freq % 1 ) * samp.values_per_wave;
    const i = Math.floor( a * 0.99999999 );
    const b = -1 + 2 * THREE.MathUtils.seededRandom( samp.int_shift + i );
    const n = b;
    return n * samp.amplitude;

};

/*
CS.WAVE_FORM_FUNCTIONS.seedednoise = (samp, a_wave )=> {
    samp.values_per_wave = samp.values_per_wave === undefined ? 40 : samp.values_per_wave;
    samp.int_shift = samp.int_shift === undefined ? 0 : samp.int_shift;
    samp.freq_alpha = samp.freq_alpha === undefined ? 1 : samp.freq_alpha;
    samp.array = [];
    let i2 = 0;
    while(i2 < samp.values_per_wave){
        const n = -1 + 2 * THREE.MathUtils.seededRandom( samp.int_shift + i2 );
        samp.array.push(n);
        i2 += 1;
    }
    const freq_raw = samp.frequency;
    const freq = freq_raw * samp.freq_alpha;
    const a = ( a_wave * freq % 1 ) * samp.array.length;
    const i = Math.floor( a * 0.99999999 );
    const n = samp.array[ i ];
    return n * samp.amplitude;
};
*/
