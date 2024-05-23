

/********* **********
 BUILT IN GENERATORS
********** *********/
const GENERATORS = {
    sin: {
        channels: 2,
        sample_rate: 10,
        sample_depth: 24,
        sample_size: 10,
        options: { freq: 1, amp: 0.45 },
        gen: ( index_sample, opt, generator ) => {       
            const a_sec = index_sample % generator.sample_rate / generator.sample_rate;
            const a_cycle = opt.freq * a_sec % 1;
            const n_alpha = Math.sin( Math.PI * a_cycle ) * opt.amp;
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
    return Buffer.from(buff);
};


/********* **********
 CRUDE START HERE
********** *********/

const generator = GENERATORS.sin;
let index_sample = 0;

console.log( create_wave_header() );

while( index_sample < generator.sample_size ){
    
    const n_alpha = generator.gen( index_sample,  generator.options, generator );
    
    console.log(n_alpha)
    
    index_sample += 1;
}

