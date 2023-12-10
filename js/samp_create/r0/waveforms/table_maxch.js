CS.WAVE_FORM_FUNCTIONS.table_maxch = (samp, a_wave ) => {
    const table_count = samp.table.length;
    const freq = samp.frequency === undefined ? 1 : samp.frequency;
    const maxch = samp.maxch === undefined ? table_count : samp.maxch;
    let i_wf = 0;
    let s = 0;
    while(i_wf < table_count ){
        const wf = samp.table[i_wf];
        const wf_samp = CS.WAVE_FORM_FUNCTIONS[wf.waveform](wf, a_wave * freq % 1);
        s += wf_samp;
        i_wf += 1;
    }
    return s * ( 1 / maxch ) * samp.amplitude;
};
