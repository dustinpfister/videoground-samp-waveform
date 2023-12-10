// waveform like 'seedednoise', but with a 'saw_effect' param
CS.WAVE_FORM_FUNCTIONS.seededsaw = (samp, a_wave )=> {
    samp.saw_effect = samp.saw_effect === undefined ? 0.5 : samp.saw_effect;
    samp.values_per_wave = samp.values_per_wave === undefined ? 40 : samp.values_per_wave;
    samp.int_shift = samp.int_shift === undefined ? 0 : samp.int_shift;
    samp.freq_alpha = samp.freq_alpha === undefined ? 1 : samp.freq_alpha;
    const freq_raw = samp.frequency;
    const freq = freq_raw * samp.freq_alpha;
    const a = a_wave * freq % 1;
    const i = Math.floor( (a * samp.values_per_wave) * 0.99999999 );
    const i2 = i + 1 % samp.values_per_wave;
    const b1 = -1 + 2 * THREE.MathUtils.seededRandom( samp.int_shift + i );
    const b2 = -1 + 2 * THREE.MathUtils.seededRandom( samp.int_shift + i2 );
    const n = THREE.MathUtils.lerp(b1, b2, a * (samp.values_per_wave * samp.saw_effect) % 1);
    return n * samp.amplitude;
};
