/*   waver_gen.js - draft js file for waver.js R0
 *      * The main goal here is to have decent code just for what a 'generator' is
 *      * have both a wav, and 'tone' generator
 *      * methods to help use a given generator, built into this file or otherwise
 *
 */
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const open = promisify(fs.open);
const close = promisify(fs.close);
const read = promisify(fs.read);

const uri_wav = process.argv[2] || 'audio.wav';


const signedint_to_alpha = ( value=0, bytes=3 ) => {
    const min = Buffer.from( new Array( bytes - 1 ).fill(0).concat( [128] ) ).readIntLE(0, bytes);
    const max = Buffer.from( new Array( bytes - 1 ).fill(255).concat( [127] ) ).readIntLE(0, bytes);
    const delta = Math.abs(min);
    const alpha = ( value + delta) / ( max  + delta );
    return alpha;
};

const unsignedint_to_alpha = ( value=0, bytes=1 ) => {
    const min = Buffer.from( new Array( bytes).fill(0) ).readUintLE(0, bytes);
    const max = Buffer.from( new Array( bytes).fill(255) ).readUintLE(0, bytes);
    const delta = Math.abs(min);
    const alpha = ( value + delta) / ( max  + delta );
    return alpha;
};

/********* **********
 WAV FILE TOOLS
********** *********/
// get a header object from a 44 byte data buffer that is the head of a wav file
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
// get an array of samples for each channel
const get_wav_samples = (uri_wav, sample_start=0, sample_end=0, to_alpha=true) => {
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
                        const value = buff_audio.readIntLE( byte_start, 1 );
                        sample_value = to_alpha ? unsignedint_to_alpha( value, 1 ) : value;
                    }
                    if(header.sample_depth === 16){
                        const value = buff_audio.readIntLE( byte_start, 2 );
                        sample_value = to_alpha ? signedint_to_alpha( value, 2 ) : value;
                    }
                    if(header.sample_depth === 24){
                        const value = buff_audio.readIntLE( byte_start, 3 );
                        sample_value = to_alpha ? signedint_to_alpha( value, 3 ) : value;
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
// get a total count of samples from a wav file
const get_wav_total_samples = (uri_wav, ) => {
    return get_wav_samples(uri_wav, 0, 0)
    .then( (result) => {
        return result.total_samples;
    });
};
/********* **********
  GENERATOR
********** *********/
const GENERATORS = {};

GENERATORS.wav = {
    name: 'wav',
    options: { uri: 'audio.wav' }
};

// the method to call to create the samples
GENERATORS.wav.create = (opt) => {
    const uri_wav = opt.generator_options.uri;
    return get_wav_total_samples(uri_wav)
    .then( (total_samples) => {
        let start = 0;
        const i_samp_start = Math.floor( total_samples * 0.53 );
        let i_samp_end = i_samp_start + 50;  
        return get_wav_samples( uri_wav, i_samp_start, i_samp_end, true );
    })
    .then( (result) => {
        return {
            sample_rate: result.header.sample_rate,
            total_samples: result.total_samples,
            channels: result.header.channels,
            samples: result.samples,
            message: 'SUCCESS: Good Results'
        }
    })
    .catch( (e) => {
        return {
            sample_rate: 0,
            total_samples: 0,
            channels: 1,
            samples: [],
            message: e.message
        }
    })
};


const api = {};


api.signedint_to_alpha = signedint_to_alpha;

// the main create samples method
const CREATE_DEFAULT = {
    sample_rate: 48000,
    channels: 2,
    sample_count: 48000,
    generator_name : 'wav',
    generator_options : { }
};


api.create_samples = (opt) => {
    opt = Object.assign({}, CREATE_DEFAULT, opt);
    const gen = GENERATORS[ opt.generator_name ];
    // fill any blanks for options, using gen object defaults
    opt.generator_options = Object.assign({}, gen.options, opt.generator_options );
    return gen.create( opt );
};



const opt = {
   sample_rate: 44100,
   channels: 1
};

if(process.argv[2]){
    opt.generator_options = { uri: path.join( __dirname, process.argv[2] ) }
}

api.create_samples(opt)
.then( (result) => {
    console.log(result);
})




