CS.WAVE_FORM_FUNCTIONS.tri = (sampeset, a_wave ) => {
    const sc = sampeset.step_count === undefined ? 10 : sampeset.step_count;
    const a = sampeset.frequency * a_wave % 1;
    let a_bias = 1 - Math.abs( 0.5 - a ) / 0.5;
    if(sc >= 2){
        a_bias = Math.floor( a_bias * sc) / (sc - 1);
    }
    const amp = sampeset.amplitude; 
    return  amp * -1 + amp * 2 * a_bias;
};
