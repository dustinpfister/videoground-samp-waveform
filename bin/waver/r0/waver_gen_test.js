/*   waver_gen_test.js - testing out waver_gen.js for waver R0
 *
 */

const waver_gen = require('./waver_gen.js');
const path = require('path');

const opt = {
   sample_rate: 44100,
   channels: 1
};

if(process.argv[2]){
    opt.generator_options = { uri: path.join( __dirname, process.argv[2] ) }
}

waver_gen.create_samples(opt)
.then( (result) => {
    console.log(result);
});

