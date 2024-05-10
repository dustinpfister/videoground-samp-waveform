const read = require('fs').readFile;
const midi = require('./r0/midi-parser.js')


read('./test_1track_2m.mid', 'binary', (e, data) => {

    if(e){
        console.warn(e);
        return;
    }

    const buff = Buffer.from(data, 'binary');
    const u = Uint8Array.from(buff);

    const j = midi.parse(u);

    console.log( j.track[0] );

});

