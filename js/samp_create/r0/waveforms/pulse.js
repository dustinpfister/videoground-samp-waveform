CS.WAVE_FORM_FUNCTIONS.pulse = (sampeset, a_wave ) => {
    const duty = sampeset.duty === undefined ? 0.5 : sampeset.duty;
    const a = sampeset.frequency * a_wave % 1;
    if(a < duty){
        return  -1 * sampeset.amplitude;
    }
    return sampeset.amplitude;
};
CS.WAVE_FORM_FUNCTIONS.square = (sampset, a_wave ) => {
    sampset.duty = 0.5;
    return CS.WAVE_FORM_FUNCTIONS.pulse(sampset, a_wave);
};
