CS.WAVE_FORM_FUNCTIONS.bass_basic = (samp, a_wave) => {
    samp.amplitude = samp.amplitude === undefined ? 0.5: samp.amplitude;
    samp.frequency = samp.frequency === undefined ? 80: samp.frequency;
    samp.a_note = samp.a_note === undefined ? samp.a_wave : samp.a_note;
    const freq = samp.frequency;
    const a = Math.sin( Math.PI * freq * a_wave );
    const b = a * Math.sin( Math.PI * samp.a_note );
    const c = b * samp.amplitude;
    return c;
};
