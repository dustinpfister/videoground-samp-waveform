// samp-create - r0 - from videoground-beta-world
(function(){
    //-------- ----------
    // DEFAULT FOR SAMPLE FUNCITON
    //-------- ----------
    const DEFAULT_FOR_SAMPSET = ( sampeset, i, a_sound, opt ) => {
        sampeset.a_wave = ST.get_wave_alpha_totalsecs( a_sound, opt.secs );
        sampeset.amplitude = 0.5;
        sampeset.frequency = 160;
        return sampeset;
    };
    const DEFAULT_FOR_FRAME = (frameset, frame, frame_max) => {
        return frameset;
    };
    //-------- ----------
    // WAVE FORMS - return should be in what I am calling 'raw' mode ( -1 to 1 )
    //-------- ----------
    const WAVE_FORM_FUNCTIONS = {};
    WAVE_FORM_FUNCTIONS.sin = (sampset, a_wave ) => {
        const wavelength = sampset.wavelength === undefined ? 1 : sampset.wavelength;
        const n = wavelength * Math.floor(sampset.frequency);
        return Math.sin( Math.PI  * n * a_wave )  * sampset.amplitude;
    };
    WAVE_FORM_FUNCTIONS.sin2 = (samp, a_wave ) => {
        return Math.sin( Math.PI  * 2 * ( samp.frequency * a_wave ) )  * samp.amplitude;
    };
    //-------- ----------
    // HELPERS
    //-------- ----------
    const parse_waveform = ( opt ) => {
        let waveform = opt.waveform || WAVE_FORM_FUNCTIONS.sin;
        if(typeof waveform === 'string'){
            waveform = WAVE_FORM_FUNCTIONS[waveform];
        }
        return waveform;
    };
    //-------- ----------
    // PUPLIC API
    //-------- ----------
    const CS = {
        WAVE_FORM_FUNCTIONS: WAVE_FORM_FUNCTIONS
    };
    // create an array of sample values
    CS.create_samps = ( opt = {} ) => {
        const i_size = opt.i_size === undefined ? 20 : opt.i_size;
        const i_start = opt.i_start === undefined ? 8 : opt.i_start;
        const i_count = opt.i_count === undefined ? 8 : opt.i_count;
        const mode = opt.mode === undefined ? 'int16' : opt.mode;
        const step = opt.step === undefined ? 1 : opt.step;
        opt.secs === undefined ? 1 : opt.secs;
        const for_sampset = opt.for_sampset || DEFAULT_FOR_SAMPSET;
        const for_frame = opt.for_frame || DEFAULT_FOR_FRAME;
        const waveform = parse_waveform(opt);
        const samps = [];
        let sampeset = {};
        let frameset = {};
        const a_sound2 = opt.frame / opt.max_frame;
        for_frame(frameset, opt.frame, opt.max_frame, a_sound2, opt);
        const i_end = i_start + i_count;
        let i = i_start;
        while(i < i_end){
            const a_sound = i / i_size;
            sampeset = for_sampset(sampeset, i, a_sound, frameset, opt);
            const a_wave = sampeset.a_wave === undefined ? ST.get_wave_alpha_totalsecs( a_sound, opt.secs ) : sampeset.a_wave;
            let samp = waveform(sampeset, a_wave);
            samp = ST.raw_to_mode(samp, opt.mode);
            //samps.push( parseFloat( samp.toFixed(8) ) );
            samps.push( samp );
            i += step;
        }
        return samps;
    };
    // create sound object
    CS.create_sound = ( opt = {} ) => {
        const sound = {
            waveform: opt.waveform || 'sin',
            for_sampset: opt.for_sampset || null,
            for_frame: opt.for_frame,
            mode: 'int16', //  16-bit only for r0
            sample_rate: opt.sample_rate === undefined ? 44100 : opt.sample_rate,
            secs: opt.secs === undefined ? 10 : opt.secs,
            array_frame: [],
            frames: 0,
            ud: {}
        };
        sound.frames = 30 * sound.secs;
        sound.total_samps = sound.sample_rate * sound.secs;
        sound.samples_per_frame = sound.sample_rate / 30;
        sound.bytes_per_frame = sound.samples_per_frame;
        sound.bytes_per_frame = Math.floor( sound.sample_rate * 2 / 30 );
        return sound;
    };
    // Build a Wave file buffer
    // base on what I found here
    //https://gist.github.com/also/900023
    //https://ccrma.stanford.edu/courses/422-winter-2023/index.htm
    CS.buildWaveHeader = (opts) => {
        var numFrames = opts.numFrames || 0;     // default to 0 frames
        var numChannels = opts.numChannels || 1; // default to 'mono' (dp edit)
        var sampleRate = opts.sampleRate || 44100;
        var bytesPerSample = opts.bytesPerSample || 2;
        var blockAlign = numChannels * bytesPerSample;
        var byteRate = sampleRate * blockAlign;
        var dataSize = numFrames * blockAlign;
        var buffer = new ArrayBuffer(44);
        var dv = new DataView(buffer);
        var p = 0;
        function writeString(s) {
            for (var i = 0; i < s.length; i++) {
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
        writeString('RIFF');              // ChunkID
        writeUint32(dataSize + 36);       // ChunkSize
        writeString('WAVE');              // Format
        writeString('fmt ');              // Subchunk1ID
        writeUint32(16);                  // Subchunk1Size
        writeUint16(1);                   // AudioFormat
        writeUint16(numChannels);         // NumChannels
        writeUint32(sampleRate);          // SampleRate
        writeUint32(byteRate);            // ByteRate
        writeUint16(blockAlign);          // BlockAlign
        writeUint16(bytesPerSample * 8);  // BitsPerSample
        writeString('data');              // Subchunk2ID
        writeUint32(dataSize);            // Subchunk2Size
        return buffer;
    };
    // create an array of samples for a given frame relative to the given max frame
   // this will also update the array_frame array of the given sound object
    CS.create_frame_samples = (sound, frame = 0, max_frame = 30) => {
        const i_start = Math.floor(sound.samples_per_frame * frame);
        const data_samples =  sound.array_frame = CS.create_samps({
            frame: frame, max_frame: max_frame,
            sound: sound,
            waveform: sound.waveform,
            for_frame: sound.for_frame,
            for_sampset: sound.for_sampset,
            i_size : sound.total_samps,
            i_start : i_start,
            i_count : sound.samples_per_frame,
            secs: sound.secs,
            mode: sound.mode
        });
        return data_samples;
    };
    // use the video ground API to write then given data_samples created with CS.create_frame_samples
    // to a given video.wav file at the given path
    CS.write_frame_samples = (sound, data_samples, frame = 0, filePath, isExport=false ) => {
        if(!isExport || !filePath){ return; }
        const fn = 'video.wav';
        const uri = videoAPI.pathJoin(filePath, fn);
        if( frame === 0 ){
            const numChannels = 1;
            const array_header = CS.buildWaveHeader({
                numFrames: sound.sample_rate * numChannels * sound.secs,
                numChannels: numChannels,
                sampleRate: sound.sample_rate,
                bytesPerSample: 2
            });
            return videoAPI.write(uri, new Int16Array( array_header ), true )
            .then(()=>{
                return videoAPI.write(uri, new Int16Array(data_samples), false );
            });
        }
        return videoAPI.write(uri, new Int16Array(data_samples), false );
    };
    // append public api to window
    window.CS = CS;
}());
