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

    const array = [];

    let metronome_pulse = 24;
    let ms_per_quarter_note = 10000;

    j.track[0].event.forEach( (obj) => {
    
        //console.log(obj)
    
        // Time Signature event
        if(obj.type === 255 && obj.metaType === 88){
            console.log('----------');
            console.log( 'Time Signature' );
            // https://www.recordingblogs.com/wiki/midi-time-signature-meta-message
            
            const n = obj.data[0];
            const d = Math.pow(2, obj.data[1] );
            metronome_pulse = obj.data[2];
            const n32_per_beat = obj.data[3];
            console.log( 'Time is : ' + n + '/' + d );
            console.log( 'metronome_pulse : ' + metronome_pulse );
            console.log( '32nd notes per beat: ' + n32_per_beat );
        }
        
        if(obj.type === 255 && obj.metaType === 81){
            console.log('----------');
            console.log( 'Tempo' );
            ms_per_quarter_note = obj.data;
            console.log('ms per quarter note : ' + ms_per_quarter_note);
        }
        
        // note on event
        if(obj.type === 9){
            console.log('----------');
            console.log('Note on event');
            console.log(obj.deltaTime, obj.data);   
        }
    
    
    })

});

