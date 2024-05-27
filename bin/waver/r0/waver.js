const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const write = promisify(fs.writeFile);
//-------- ----------
// PUPLIC API 
//-------- ----------
// use fs.writeFile in append mode to write the given Uint8Array
// however allow for a clear method that will write over with a new file if it is there
const writer_append = (uri, buff, clear = true ) => {
    if(clear){
        return write( uri, buff );
    }
    return write( uri, buff, { flag: 'a+' } );
};

/********* **********
 BUILT IN GENERATORS
********** *********/
const GENERATORS = {
    sin: {
        channels: 2,
        sample_rate: 48000,
        sample_depth: 24,
        sample_size: 48000,    // number of total samples to create
        options: [ { freq: 160, amp: 0.90 }, { freq: 600, amp: 0.25 }, ],
        gen: ( index_sample, opt, generator ) => {
            const a_sec = index_sample % generator.sample_rate / generator.sample_rate;
            const a_cycle = opt.freq * a_sec % 1;
            const n_alpha = 0.5 - 0.5 * Math.sin( Math.PI  * 2 * a_cycle )  * opt.amp;
            // return value should be in 0-1 format
            return n_alpha;
        }
    }   
};

// Build a Wave file buffer
// base on what I found here
// https://gist.github.com/also/900023
// https://ccrma.stanford.edu/courses/422-winter-2023/index.htm
// https://docs.fileformat.com/audio/wav/
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
 CRUDE START HERE
********** *********/
const generator = GENERATORS.sin;

const secs = generator.sample_size / generator.sample_rate;
const frame_count = Math.ceil(generator.sample_size * secs);
const bytes_per_sample = generator.sample_depth / 8;
const header = create_wave_header({
    numFrames: frame_count,
    numChannels: generator.channels,
    sampleRate: generator.sample_rate,
    bytesPerSample: bytes_per_sample
});

const data_size = frame_count *  generator.channels * bytes_per_sample;

const buffer_data = Buffer.alloc( data_size );

console.log( 'seconds=' + secs );
console.log( 'bytes_per_sample=' + bytes_per_sample);
console.log( 'frame_count= ' + frame_count );
console.log( 'data_size= ' + data_size );

writer_append('../out.wav', header, true)
.then(()=>{
    console.log('header written, writing samples...');
  
    let index_sample = 0;
    while( index_sample < generator.sample_size ){
        let index_ch = 0;
        const ch = generator.channels;
        while(index_ch < ch){
    
            const n_alpha = generator.gen( index_sample,  generator.options[index_ch], generator );
    
            // 8 bit sound
            if(generator.sample_depth === 8){
                const value = Math.round( n_alpha * 255 );
                buffer_data.writeUint8(value, index_sample * ch + index_ch );
            }
    
            // 16 bit sound
            if(generator.sample_depth === 16){
                const value = Math.floor(-32768 + (n_alpha * 65535));
                buffer_data.writeInt16LE(value, index_sample * ( 2 * ch ) + ( 2 * index_ch ) );
            }
            
            // 24 bit sound
            if(generator.sample_depth === 24){
                const value = Math.floor(-8388608 + (n_alpha * ( 16777215) ) );
                buffer_data.writeIntLE(value, index_sample * ( 3 * ch ) + ( 3 * index_ch ), 3 );
            }
    
            index_ch += 1;
        }
        index_sample += 1;
    }
    return writer_append('../out.wav', buffer_data, false);   
})
.then(()=>{
    console.log('wav file done');
});

