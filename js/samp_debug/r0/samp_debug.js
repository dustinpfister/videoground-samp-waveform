// samp-debug - r0 - from videoground-samp-waveform
(function(){
    //-------- ----------
    // PUPLIC API
    //-------- ----------
    const CDB = {};
    // write out an array of data samples to a text file
    CDB.write_text_samples = (data_samples, frame=0, filePath  ) => {
        if(!filePath){
            return Promise.reject('no filePath given');
        }
        const fn = 'samples_' + frame + '.txt';
        const dir_frames = videoAPI.pathJoin(filePath, 'debug/frames');
        const uri = videoAPI.pathJoin(dir_frames, fn);
        const max_samp_index_nums = String(data_samples.length).length;
        const text = data_samples.map((samp, i)=>{
            return String(i).padStart(max_samp_index_nums, '0') + ' ' + samp;
        }).join('\n');
        return videoAPI.write(uri, text, true );
    };
    // append public api to window
    window.CDB = CDB;
}());
