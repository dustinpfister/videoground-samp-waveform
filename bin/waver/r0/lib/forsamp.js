/*   forsamp.js - from waver.js R0
 *      * code that will do something with the output of a generator.
 */
const FORSAMP = {};

/********* **********
    FORSAMP - nbit - convert audio to a set number of values based on a 'bits' option
********** *********/
FORSAMP.nbit = {
    name: 'nbit',
    options: { bits: 1, amp: 0.75 },
    process: (value, index_samp, index_ch, result, opt) => {
        const levels = Math.pow( 2, opt.bits );
        const  dx = value - 0.5;
        const d = Math.sqrt(dx * dx);
        const amp_low = 1 - opt.amp;
        const amp_delta = opt.amp - amp_low;
        //if( d <= 0.020 || d >= 0.350 ){
        if( d <= 0.020 ){
            return amp_low;
        }      
        return amp_low + amp_delta * Math.round( value  * ( levels - 1) );
    }
};
/********* **********
   PUBLIC API
********** *********/
const api = {};
// process a result object created by a generator
api.process_result = ( result ) => {
    const opt_forsamp = {};
    const forsamp = FORSAMP.nbit;
    const opt = Object.assign({}, forsamp.options, opt_forsamp );
    let i_samp = 0;
    while(i_samp < result.total_samples){
        const index_ch = 0;
        const value_raw = result.samples[index_ch][i_samp];
        const value = forsamp.process( value_raw, i_samp, index_ch, result, opt );  
        result.samples[index_ch][i_samp] = value;
        i_samp += 1;
    }
    result.message = 'SUCCESS: result object mutated with ' + forsamp.name;
    return result;
};
module.exports = api;


