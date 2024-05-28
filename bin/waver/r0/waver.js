/*   waver.js - R0 - create wav files or other data from and to wav files
 *
 */
//-------- ----------
// NODE MODULES
//-------- ----------
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const write = promisify(fs.writeFile);
//-------- ----------
// GENERATORS
//-------- ----------
const waver_gen = require( path.join(__dirname, './lib/gen.js') );
const waver_forsamp = require( path.join(__dirname, './lib/forsamp.js') );
const waver_render = require( path.join(__dirname, './lib/render.js') );
//-------- ----------
// HELPERS
//-------- ----------
// use fs.writeFile in append mode to write the given Uint8Array
// however allow for a clear method that will write over with a new file if it is there
const writer_append = (uri, buff, clear = true ) => {
    if(clear){
        return write( uri, buff );
    }
    return write( uri, buff, { flag: 'a+' } );
};



const create_wave_header = (opts) => {
    opts = opts || {};
    const numFrames = opts.numFrames || 0;           // default to 0 frames
    const numChannels = opts.numChannels || 1;       // default to 'mono' (dp edit)
    const sampleRate = opts.sampleRate || 44100;     // defualt to 44100 sample rate ( AUDIO CD )
    const bytesPerSample = opts.bytesPerSample || 2; // default to 16 bit sample dpeth ( AUDIO CD )
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = numFrames * blockAlign;
    const buff = new ArrayBuffer(44);
    const dv = new DataView(buff);
    let p = 0; 
    function writeString(s) {
        for (let i = 0; i < s.length; i++) {
            dv.setUint8(p + i, s.charCodeAt(i));
        }
        p += s.length;
    }
    function writeUint32(d) {
        dv.setUint32(p, d, true);
        p += 4;
    }
    function writeUint16(d) {
        dv.setUint16(p, d, true);
        p += 2;
    }
    writeString('RIFF');              // Mark the file as 'RIFF' to let programs know this is a wav file
    writeUint32(dataSize + 36);       // Should be the over all size of the file in bytes
    writeString('WAVE');              // Should always be 'WAVE'
    writeString('fmt ');              // format chunk
    writeUint32(16);                  // Subchunk1Size
    writeUint16(1);                   // audio Format 1=PCM
    writeUint16(numChannels);         // NumChannels
    writeUint32(sampleRate);          // SampleRate
    writeUint32(byteRate);            // ByteRate
    writeUint16(blockAlign);          // BlockAlign
    writeUint16(bytesPerSample * 8);  // BitsPerSample
    writeString('data');              // Subchunk2ID
    writeUint32(dataSize);            // Subchunk2Size
    return Buffer.from( buff );
};


const opt_gen = {};

if(process.argv[2]){
    const uri_in = path.join( __dirname, process.argv[2] );
    opt_gen.generator_options = { uri: uri_in }
}

waver_gen.create_samples(opt_gen)
.then( (result) => {

    // process the result
    waver_forsamp.process_result( result  );
    
    const opt_render = { uri_out: process.argv[3] || '../out.wav' };
    waver_render.write_result(result, opt_render)
    .then(()=>{
        console.log('looks like we made it');
    });    
    
});



