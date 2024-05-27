/*   test_waver_forsamp.js - testing out waver_gen.js for waver R0
 *
 */


const waver_gen = require('./waver_gen.js');
const path = require('path');
const waver_forsamp = require('./waver_forsamp.js');



const opt = {
   //sample_rate: 44100,
   //channels: 1
};

if(process.argv[2]){
    opt.generator_options = { uri: path.join( __dirname, process.argv[2] ) }
}

waver_gen.create_samples(opt)
.then( (result) => {

    waver_forsamp.process_result( result  );

    console.log(result);
    
    
});


/*
const result = {
  sample_rate: 44100,
  total_samples: 5,
  channels: 1,
  samples: [
    [
       0, 0.25, 0.49, 0.50, 0.75
    ]
  ],
  message: 'SUCCESS: Good Results'
}
console.log(result)
waver_forsamp.process_result( result  );
console.log(result)
*/


