/*   read_wav.js - draft js file for waver.js R0
 *      * The main goal here is to just have decent code for reading wav files
 *
 */
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const open = promisify(fs.open);
const close = promisify(fs.close);
const read = promisify(fs.read);

const uri_wav = process.argv[2] || '../../test.wav';

/*   get_header_object
 *   get a header object from a 44 byte data buffer that is the head of a wav file
 */
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
    header.data_size = data.readInt32LE(40);               // total size of the data area of the file in bytes
    return header;
};

/*    get_wav_samples
 *    get an array of samples for each channel
 */
const get_wav_samples = (uri_wav, sample_start=0, sample_end=0) => {
    let sample_count = sample_end - sample_start;
    let bytes_per_frame = 1;
    let total_samples = 0;
    let header = {};
    let samples = [];
    return open(uri_wav, 'r+')
    .then( (fd) => {
        const buff_header = Buffer.alloc(44);
        return read(fd, buff_header, 0, 44, 0)
        .then((data)=>{
            header = get_header_object(data.buffer);
            bytes_per_frame = header.channels * (header.sample_depth / 8);
            total_samples = header.data_size / bytes_per_frame;
            const buff_audio = Buffer.alloc(bytes_per_frame * sample_count);
            return read(fd, buff_audio, 0, bytes_per_frame * sample_count, 44 + bytes_per_frame * sample_start);
        })
        .then((data)=>{
            const buff_audio = data.buffer;
            let i_sample = 0;
            samples = new Array(header.channels).fill(1).map(()=>{ return []; });
            while(i_sample < sample_count && ( sample_start + i_sample ) < (total_samples) ){
                let index_ch = 0;
                while(index_ch < header.channels){
                    let sample_value = 0;
                    const bytes_per_sample = header.sample_depth / 8;
                    const byte_start = i_sample * bytes_per_frame + ( bytes_per_sample * index_ch );
                    if(header.sample_depth === 8){
                        sample_value = buff_audio.readUIntLE( byte_start, 1 );
                    }
                    if(header.sample_depth === 16){
                        sample_value = buff_audio.readIntLE( byte_start, 2 );
                    }
                    if(header.sample_depth === 24){
                        sample_value = buff_audio.readIntLE( byte_start, 3 );
                    }
                    samples[index_ch].push(sample_value);
                    index_ch += 1;
                }
                i_sample += 1;
            }
            return close(fd);
        })
        .then(()=>{
            return Promise.resolve( {
                header: header,
                sample_start: sample_start,
                total_samples: total_samples,
                samples: samples
            });
        });
    });
};

const get_wav_total_samples = (uri_wav, ) => {
    return get_wav_samples(uri_wav, 0, 0)
    .then( (result) => {
        return result.total_samples;
    });
};

get_wav_total_samples(uri_wav)
.then( (total_samples) => {
    let start = 0;
    
    //const i_samp_start = 470;
    //const i_samp_start = 479999;
    //const i_samp_start = 331199;
    const i_samp_start = Math.floor( total_samples * 0.5352 );
    let i_samp_end = i_samp_start + 50;
    
    return get_wav_samples(uri_wav, i_samp_start, i_samp_end);
})
.then( (result) => {
    
    console.log(result)
});

