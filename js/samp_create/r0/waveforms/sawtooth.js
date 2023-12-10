CS.WAVE_FORM_FUNCTIONS.sawtooth = (sampeset, a_wave ) => {
    const a = ( sampeset.frequency * a_wave % 1 );
    return -1 * sampeset.amplitude + 2 * a * sampeset.amplitude;
};
