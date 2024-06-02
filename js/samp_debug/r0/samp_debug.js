// samp-debug - r0 - from videoground-samp-waveform
(function(){

    //-------- ----------
    // PUPLIC API
    //-------- ----------
    const CDB = {};
    // write out an array of data samples to a text file
    CDB.write_text_samples = (data_samples, frame=0, filePath  ) => {
        if(!filePath){ return; }
        const fn = 'samples_' + frame + '.txt';
        const uri = videoAPI.pathJoin(filePath, fn);
        const text = data_samples.join('\n');
        if( frame === 0 ){
            return videoAPI.write(uri, text, true )
        }
        return videoAPI.write(uri, text, false );
    };
    // append public api to window
    window.CDB = CDB;
}());
