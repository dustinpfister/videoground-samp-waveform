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
    header.frame_size = data.readInt32LE(28);              // frame size
    header.block_align = data.readInt16LE(32);             // block align in bytes ( 2 for 16-bit mono, 6 for 24-bit, ect)
    header.sample_depth = data.readInt16LE(34);            // sample depth in bits per sample (16 = cd )
    header.data = data.subarray(36, 40).toString();        // 'data' string
    header.data_size = data.readInt32LE(40);
    return header;
};


open(uri_wav, 'r+')
.then( (fd) => {
    const buff = Buffer.alloc(44);
    return read(fd, buff, 0, 44, 0)
    .then((data)=>{
    
        const header = get_header_object(data.buffer);
    
        console.log(header)
    
    })

    //const buff = new Buffer.alloc(36);
    //return read(fd, buff, 0, 36)
    //.then((data) => {
    //console.log(data)
    //    return close(fd);
    //});
})

/*
fs.open('gfg.txt', 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }
 
    console.log("Reading the file");
 
    fs.read(fd, buffer, 0, buffer.length,
        0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
 
            if (bytes > 0) {
                console.log(buffer.
                    slice(0, bytes).toString());
            }
            console.log(bytes + " bytes read");
 
            // Close the opened file.
            fs.close(fd, function (err) {
                if (err) {
                    console.log(err);
                }
 
                console.log("File closed successfully");
            });
        });
});
*/
