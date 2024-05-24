const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const open = promisify(fs.open);
const close = promisify(fs.close);
const read = promisify(fs.read);

const uri_wav = process.argv[2] || 'audio.wav';


const get_header_object = (data) => {
    const header = {};
    header.riff = data.subarray(0, 4).toString();          // 'RIFF' string
    header.size = data.readInt32LE(4);                     // size in bytes
    header.wave = data.subarray(8, 12).toString();         // 'WAVE' string
    header.fmt = data.subarray(12, 15).toString();         // 'fmt' string
    header.format_data_length = data.readInt32LE(16);      // always 16
    header.format_type = data.readUint8(20);               // should be 1 for PCM
    header.channels = data.readInt16LE(22);                // number of channels 1=mono, 2=stereo, 3+= multi channels
    header.sample_rate = data.readInt32LE(24);             // sample rate in hertz (44100 = cd)
    header.frame_size = data.readInt32LE(28);              // !!! This is not frame size, but size per second
    header.block_align = data.readInt16LE(32);             // block align in bytes ( 2 for 16-bit mono, 6 for 24-bit, ect)
    header.sample_depth = data.readInt16LE(34);            // sample depth in bits per sample (16 = cd )
    header.data = data.subarray(36, 40).toString();        // 'data' string
    header.data_size = data.readInt32LE(40);
    return header;
};


let sample_count = 0;
let bytes_per_frame = 1;
const
open(uri_wav, 'r+')
.then( (fd) => {
    const buff_header = Buffer.alloc(44);
    return read(fd, buff_header, 0, 44, 0)
    .then((data)=>{
        const header = get_header_object(data.buffer);
        // update bytes per frame now that we have the header data
        bytes_per_frame = header.channels * (header.sample_depth / 8);
        // I can now set the sample count
        sample_count = header.data_size / bytes_per_frame;
        
        // figure start and end byte counts for data part of wav file
        const buff_audio = Buffer.alloc(3 * sample_count);
        return read(fd, buff_audio, 0, 3 * sample_count, 44);
    })
    .then((data)=>{
        let i_sample = 0;
        while(i_sample < sample_count){
            console.log(i_sample, data.buffer.readIntLE(3 * i_sample, 3) )
            i_sample += 1;
        }
        return close(fd);
    })
    .then(()=>{
    
    });
});

