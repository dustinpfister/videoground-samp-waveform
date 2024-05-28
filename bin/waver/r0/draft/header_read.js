// Just open a wav file, read the header, and spit out the info
const read = require('fs').readFile;

const uri = process.argv[2] || '../../test.wav';

read(uri, (e, data) => {
    // https://docs.fileformat.com/audio/wav/
    const header = {};
    header.riff = data.subarray(0, 4).toString();          // 'RIFF' string
    header.size = data.readInt32LE(4);                     // size in bytes
    header.wave = data.subarray(8, 12).toString();         // 'WAVE' string
    header.fmt = data.subarray(12, 15).toString();         // 'fmt' string
    header.format_data_length = data.readInt32LE(16);      // always 16
    header.format_type = data.readUint8(20);               // should be 1 for PCM
    header.channels = data.readInt16LE(22);                // number of channels 1=mono, 2=stereo, 3+= multi channels
    header.sample_rate = data.readInt32LE(24);             // sample rate in hertz (44100 = cd)
    
    header.frame_size = data.readInt32LE(28);              // frame size
    header.block_align = data.readInt16LE(32);             // block align in bytes ( 2 for 16-bit mono, 6 for 24-bit, ect)
    
    header.sample_depth = data.readInt16LE(34);            // sample depth in bits per sample (16 = cd )
    
    header.data = data.subarray(36, 40).toString();        // 'data' string
    header.data_size = data.readInt32LE(40);
    
    console.log( header );
});
