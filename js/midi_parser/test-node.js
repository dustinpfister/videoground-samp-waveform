const read = require('fs').readFile;
const MidiParser = require('./r0/midi-parser.js')





read('./midi/test_1track_1m.mid', 'binary', (e, data) => {

    if(e){
        console.warn(e);
        return;
    }

    const buff = Buffer.from(data, 'binary');
    const u = Uint8Array.from(buff);

    const midi = MidiParser.parse(u);
    
    
    let note_on = MidiParser.get_types(midi, 0, 9, false);
    
    // get total time
    //const total_t = note_on.reduce( (acc, obj) => {
    //    return acc + obj.deltaTime;
    //}, 0);
    
    const total_t = MidiParser.get_total_time(midi);
    
    let t = 0;
    note_on = note_on.map( (obj) => {
        t += obj.deltaTime;
        obj.t = t;
        obj.alpha = t / total_t; 
        return obj;
    });
    
    
    let tempo = MidiParser.get_types(midi, 0, 255, 81)
   
    const tempo_data = tempo[0].data
    const bpm = 60000000 / tempo_data;
    
    console.log( 'tempo=' + tempo_data  );
    console.log( 'bpm=' + bpm );
    
   
    
    console.log(note_on);
    console.log(total_t);

/*
    const note_on_arr = [];

    let metronome_pulse = 24;
    let ms_per_quarter_note = 10000;

    midi.track[0].event.forEach( (obj) => {
    
        // Time Signature event
        if(obj.type === 255 && obj.metaType === 88){
            console.log('----------');
            console.log( 'Time Signature' );
            // https://www.recordingblogs.com/wiki/midi-time-signature-meta-message        
            const n = obj.data[0];
            const d = Math.pow(2, obj.data[1] );
            metronome_pulse = obj.data[2];
            const n32_per_beat = obj.data[3];
            //console.log( 'Time is : ' + n + '/' + d );
            //console.log( 'metronome_pulse : ' + metronome_pulse );
            //console.log( '32nd notes per beat: ' + n32_per_beat );
        }
        
        if(obj.type === 255 && obj.metaType === 81){
            //console.log('----------');
            //console.log( 'Tempo' );
            ms_per_quarter_note = obj.data;
            //console.log('ms per quarter note : ' + ms_per_quarter_note);
        }
        
        // note on event
        if(obj.type === 9){
            //console.log('----------');
            //console.log('Note on event');
            //console.log(obj.deltaTime, obj.data);
            note_on_arr.push( obj );
        }
    
    });

    note_on_arr.forEach( (obj) => {
    
        const secs = obj.deltaTime / midi.timeDivision;
    
        console.log( secs, obj.data )
    
    });

    
    note_on_arr.sort( (a, b) => {
    
        if(a.deltaTime < b.deltaTime){
            return -1;
        }
        
        if(a.deltaTime > b.deltaTime){
            return 1;
        }
    
        return 0;
    
    })
    
    console.log(note_on_arr)
*/

});

