/*   render.js - from waver.js R0
 *      * This is code that will 'render' a final result object to an output format
 *
 */
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const write = promisify(fs.writeFile);
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
// create a wav file header buffer
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
/********* **********
  RENDERERS - JSON
********** *********/
const RENDERERS = {};
// wav file renderer
RENDERERS.wav = {
    options: { uri_out: 'test.wav' },
    write: (result, opt) => {
        const uri_out = opt.uri_out;
        const bytes_per_sample = 1;
        const buffer_data = Buffer.alloc( result.total_samples * bytes_per_sample );
        // create final data buffer
        let index_sample = 0;
        while( index_sample < result.total_samples ){
            let index_ch = 0;
            const ch = result.channels;
            while(index_ch < ch){
                const n_alpha = result.samples[index_ch][index_sample]
                // 8 bit sound
                if( bytes_per_sample === 1){
                    const value = Math.round( n_alpha * 255 );
                    buffer_data.writeUint8(value, index_sample * ch + index_ch );
                }
                // 16 bit sound
                if(bytes_per_sample === 2){
                    const value = Math.floor(-32768 + (n_alpha * 65535));
                    buffer_data.writeInt16LE(value, index_sample * ( 2 * ch ) + ( 2 * index_ch ) );
                }
                // 24 bit sound
                if(bytes_per_sample === 3){
                    const value = Math.floor(-8388608 + (n_alpha * ( 16777215) ) );
                    buffer_data.writeIntLE(value, index_sample * ( 3 * ch ) + ( 3 * index_ch ), 3 );
                }
                index_ch += 1;
            }
            index_sample += 1;
        }
        // create header buffer
        const header = create_wave_header({
            numFrames: result.total_samples,
            numChannels: result.channels,
            sampleRate: result.sample_rate,
            bytesPerSample: bytes_per_sample  
        });
        // write out the data to the final file
        return writer_append(uri_out, header, true)
        .then(()=>{
            return writer_append(uri_out, buffer_data, false);
        });    
    }
};
/********* **********
  PUBLIC API
********** *********/
const api = {};
api.write_result = (result, opt) => {
    return RENDERERS.wav.write(result, opt)
};
module.exports = api;





