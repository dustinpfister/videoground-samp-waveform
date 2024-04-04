// samp-tools - r0 - from videoground-beta-world
(function(){
    const ST = {};
    //-------- ----------
    // CURVE HELPERS
    //-------- ----------
    ST.get_curve_v2ca = (curve, alpha=0) => {
        const v2_sa = curve.getPoint(alpha);
        const v2_ca = curve.getPoint(v2_sa.x);
        let table = curve.userData;
        if(!table){
            return v2_sa;
        }
        let i = 0;
        let a = 0;
        const len = table.length;
        while(i < len){
            sa = table[i][0];
            ea = table[i + 1] ? table[i + 1][0] : 1;
            if(alpha < ea){
                a = (alpha - sa) / (ea - sa);
                //break;
                const c = curve.curves[i].getPoint(a);
                return new THREE.Vector2(alpha, c.y);
            }
            i += 1;
        }
        i = i >= len ? i - 1: i;
        //return curve.curves[i].getPoint(a);
        return v2_sa;
    };
    ST.get_curve_path = (table=[[]]) => {
        const curve_path = new THREE.CurvePath();
        curve_path.userData = table;
        table.forEach( (data, i, arr) => {
            const a_start = data[0];
            let a_end = 1;
            const data_next = arr[ i + 1];
            if(data_next){
               a_end = data_next[0];
            }
            const curve_child = ST.get_bzcubic(data[1], data[2], data[3], data[4], data[5], data[6], a_start, a_end);
            curve_path.add( curve_child );
        });
        return curve_path;
    };
    // just a THREE.CubicBezierCurve abstraction
    ST.get_bzcubic = (c1x=0.5, c1y=0.5, c2x=0.5, c2y=0.5, sy=0.1, ey=0.1, sx=0, ex=1 ) => {
        const v_start = new THREE.Vector2(sx, sy),
        v_end = new THREE.Vector2(ex, ey),
        v_c1 = new THREE.Vector2(c1x, c1y),
        v_c2 = new THREE.Vector2(c2x, c2y);
        return new THREE.CubicBezierCurve(v_start, v_c1, v_c2, v_end);
    };
    //-------- ----------
    // ALPHA VLAUES
    //-------- ----------
    ST.get_alpha = (a=0, b=1, count=1) => {
        const n = THREE.MathUtils.euclideanModulo(a, b);
        const a1 = n / b;
        const a2 = a1 * count % 1;
        return a2;
    };
    ST.get_alpha_sin = (a=0, b=1, count=1) => {
        const alpha2 = ST.get_alpha(a, b, count);
        return Math.sin( Math.PI * alpha2 );
    };
    //-------- ----------
    // WAV IMPORT
    //-------- ----------
    // get an object that contains easily readable wav field data, DataView Objects and so forth
    ST.get_wav_obj = ( data=[] ) => {
        const header_uint8 = data.slice(0, 44);
        const header_buff = header_uint8.buffer;
        const header_dv = new DataView(header_buff);
        const data_uint8 = data.slice(44, data.length);
        const data_dv = new DataView( data_uint8.buffer );
        const wav = {
            header_dv: header_dv,
            data_dv: data_dv,
            header_uint8: header_uint8,
            data_uint8: data_uint8
        };
        // maybe the two most important fields in the header, sample rate, and byte
        wav.sample_rate = header_dv.getUint32(24, true);
        wav.byte_rate = header_dv.getUint32(28, true);
        // other info
        wav.num_channels = header_dv.getUint16(22, true);
        wav.sub_chunk1_size = header_dv.getUint32(16, true);
        wav.chunk_size = header_dv.getUint32(4, true);
        wav.format = header_dv.getUint16(20, true); 
        return wav;
    };
    //
    ST.get_wav_samp_array = ( wav={}  ) => {
        const array_import = [];
        let i_byte = 0;
        const i_delta = Math.floor(wav.sub_chunk1_size / 8);
        const len = wav.data_uint8.length;
        while(i_byte < len){
            const samp = wav.data_dv.getInt16(i_byte, true);
            const samp_raw = ST.mode_to_raw(samp, 'int16');
            array_import.push(samp_raw);
            i_byte += i_delta;
        }
        return array_import;
    };
    // log wav debug info
    ST.log_wav_info = ( wav={} ) => {
        console.log('**********');
        console.log('wav info: ');
        console.log( 'chunk_size   : ' + wav.chunk_size   );
        console.log( 'sample rate  : ' + wav.sample_rate  );
        console.log( 'channels     : ' + wav.num_channels );
        console.log( 'format       : ' + wav.format );
        console.log( 'Sample Depth : ' + wav.sub_chunk1_size );
        console.log( 'byte rate    : ' + wav.byte_rate );
        console.log('**********');
    };
    // get a wavefrom array
    ST.get_waveform_array = (array_import, frames_per_import=30, frame=0 ) => {
        const array_wave = [];
        let i2 = 0;
        const len = Math.floor( array_import.length / frames_per_import );
        while(i2 < len){
            const i_import = Math.floor( (frame % frames_per_import) * len + i2 );
            array_wave.push( array_import[i_import] );
            i2 += 1;
        }
        return array_wave;
    };
    ST.get_waveform_array2 = (array_import, frame_start=0, samples_per_frame=1470 ) => {
        const array_wave = [];
        let si = frame_start * samples_per_frame;
        const len = si + samples_per_frame;
        while(si < len){
           let s = array_import[si];
           array_wave.push( s );
           si += 1;
        }
        return array_wave;
    };
    //-------- ----------
    // APPLY SQ - methods that helper with 'SeQuence' Objects
    //-------- ----------
    ST.applySQFrame = (sq, fs, frame, max_frame, a_sound2, opt) => {
        let i2 = 0;
        const len = sq.objects.length;
        let a_base = 0;
        while( i2 < len ){
            const obj = sq.objects[i2];
            if( a_sound2 <= obj.alpha ){
                let a_object = ( a_sound2 - a_base ) /  ( obj.alpha - a_base );
                if(!obj.for_frame){
                    return;
                }
                return obj.for_frame(fs, frame, max_frame, a_sound2, opt, a_object, sq);
            }
            a_base = obj.alpha;
            i2 += 1;
        }
    };
    ST.applySQ = ( sq, samp, i, a_sound, opt ) => {
        let i2 = 0;
        const len = sq.objects.length;
        let a_base = 0;
        while( i2 < len ){
            const obj = sq.objects[i2];
            if( a_sound <= obj.alpha ){
                if(!obj.for_sampset){
                    break;
                }
                let a_object = ( a_sound - a_base ) /  ( obj.alpha - a_base );
                return obj.for_sampset(samp, i, a_sound, opt, a_object, sq);
            }
            a_base = obj.alpha;
            i2 += 1;
        }
    };
    //-------- ----------
    // FOR_SAMPLE HELPER : to help with the for sample methods used in sound objects
    //-------- ----------
    ST.get_beat_alpha = ( alpha=0, total_secs=1, bps=4) => {
        return bps * total_secs * alpha % 1;
    };
    ST.get_wave_alpha_totalsecs = (a_sound = 0, total_secs = 10) => {
        return a_sound * total_secs % 1;
    };
    //-------- ----------
    // BASIC TUNE TOOLS
    //-------- ----------
    // simple tune frequency helper function, can pass an array of 'note index values'
    // a note index of 0 means silence, while 1 to the max value in the array is the range
    // what the range is can be set by a low and high frequency arguments
    ST.freq_tune = (alpha=0, tune=[ 1,0,1,1,0,7,0,6,0,5 ], hz_low=80, hz_high=1000 ) => {
        const i_high = Math.max.apply(null, tune);
        const note = tune[ Math.floor( tune.length * alpha * 0.99 ) ];
        if(note === 0){
            return 0;
        }
        return hz_low + ( hz_high - hz_low ) * ( note / i_high );
    };
    // step a frequency from a start frequency, by a step frequency, and count of times over an alpha
    // value up or down depending on dir
    ST.freq_step = (alpha=0, hz_start=1000, hz_step=50,  count_step=10, dir=1 ) => {
        return hz_start + hz_step * Math.floor( alpha *  count_step ) * dir
    };
    //-------- ----------
    // ADVANCED TUNE TOOLS
    //-------- ----------
    ST.notefreq = ( index=0 ) => {
        return 16.35 * Math.pow(2, index / 12);
    };
    // https://www.seventhstring.com/resources/notefrequencies.html
    // https://en.wikipedia.org/wiki/Musical_note
    ST.notefreq_by_indices = ( i_scale=4, i_note=5 ) => {
        const a = i_scale - 5;
        const b = i_note + 3;
        return 440 * Math.pow(2, a + b / 12);
    };
    ST.create_nf = () => {
        // 0=C, 1=C#, 2=D, 3=D#, 4=E, 5=F, 6=F#, 7=G, 8=G#, 9=A, 10=A#, 11=B
        const array_notes = 'c,c#,d,d#,e,f,f#,g,g#,a,a#,b'.split(',');
        const nf = {
           r: 0,     // r for rest
           rest: 0   // also just rest
        };
        let scale = 0;
        while(scale < 8){
            let ni = 0;
            while(ni < 12){
                const freq = ST.notefreq_by_indices(scale, ni);
                const key = array_notes[ ni ] + scale;
                nf[key] = freq;
                ni += 1;
            }
            scale += 1;
        }
        return nf;
    };
    const get_beat_count = (tune) => {
        let i = 0;
        const len = tune.length;
        let count = 0;
        while(i < len ){
            count += tune[i];
            i += 2;
        }
        return count;
    };
    ST.tune_to_alphas = (tune, nf) => {
        const beat_ct = get_beat_count(tune);
        let a = 0;
        let i = 0;
        const len = tune.length;
        const a_perbeat = 1 / beat_ct;
        const data = [];
        while(i < len ){
            const beat_count = tune[i];
            const note_key = tune[i + 1];
            const freq = nf[ note_key ];
            const d = a_perbeat * beat_count;
            data.push(a, a + d, freq );
            a += d;
            i += 2;
        }
        return data;
    };
    ST.get_tune_sampobj = ( data=[], a_sound=0, secs=1, freq_adjust=true ) => {
        let id = 0;
        const obj = { a_wave: 0, frequency: 0 };
        while(id < data.length){
            const alow = data[id];
            const ahi = data[id + 1];
            const freq = data[id + 2];
            if( a_sound >= alow && a_sound < ahi){
                const arange = alow - ahi;
                const s = arange * secs;
                obj.a_wave = Math.abs( ( a_sound - alow ) / arange);
                obj.a_wavesin = Math.sin( Math.PI * obj.a_wave );
                obj.frequency = freq;
                if(freq_adjust){
                    obj.frequency = freq * s;
                }
                break;
            }
            id += 3;
        }
        return obj;
    };
    // get tune amplitude helper for notes that are all on the same frequency
    ST.get_tune_amp = (freq=0, a_note=0, pad=0.05, max_amp=0.75) => {
        let amp = 0;
        if(freq === 0){
            return amp;
        }
        if(freq > 0){
            amp = max_amp;
            const pad2 = 1 - pad;
            if(a_note < pad){
                const a = a_note / pad;
                amp = max_amp * a;
            }
            if(a_note > pad2){
                const a = 1 - (a_note - pad2) / pad;
                amp = max_amp * a;
            }
        }
        return amp;
    };
    //-------- ----------
    // SAMP VALUES: Methods to help with sample values
    //-------- ----------
    ST.get_range = (min, max) => {
        const v_min = new THREE.Vector2( min, 0);
        const v_max = new THREE.Vector2( max, 0);
        return v_min.distanceTo(v_max);
    };
    ST.get_normal = ( samp=0, min=-32768, max=32767 ) => {
        const v_samp = new THREE.Vector2( samp, 0);
        const v_min = new THREE.Vector2( min, 0);
        const range = ST.get_range(min, max);
        return v_samp.distanceTo( v_min ) / range;
    };
    ST.get_raw = ( samp=0, min=0, max=255 ) => {
        const samp_normal = ST.get_normal(samp, min, max);
        return -1 + samp_normal * 2;
    };
    ST.raw_to_mode = ( samp = 0, mode = 'bytes' ) => {
        if(mode === 'bytes'){
           let byte = Math.round( 127.5 + 128 * samp );
           samp = THREE.MathUtils.clamp(byte, 0, 255);
        }
        if(mode === 'int16'){
            samp = ( samp + 1 ) / 2;
            samp = THREE.MathUtils.clamp(samp, 0, 1);
            samp = -32768 + ( 32768 + 32767 ) * samp;
            samp = Math.floor(samp);
        }
        if(mode === 'normal'){
            samp = ( samp + 1 ) / 2;
            samp = THREE.MathUtils.clamp(samp, 0, 1);
        }
        return samp;
    };
    ST.mode_to_raw = ( samp = 0, mode = 'bytes' ) => {
        if(mode === 'bytes'){
            samp = ST.get_raw( samp, 0, 255 );
        }
        if(mode === 'int16'){
            samp = ST.get_raw( samp, -32768,  32767 );
        }
        return samp;
    };
    window.ST = ST;
}());
