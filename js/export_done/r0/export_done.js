// export_done.js - R0 - from videoground-samp-waveform
(function(){
    const ED = {};
    ED.to_mp4_audio_clean = (sm) => {
        const in_file = videoAPI.pathJoin( sm.imageFolder, 'frame-%06d.png' );
        const in_file_audio = videoAPI.pathJoin( sm.imageFolder, 'video.wav' );
        //const out_file = videoAPI.pathJoin( sm.imageFolder, 'raw.mp4' );
        
        const out_file = videoAPI.pathJoin( sm.imageFolder, String(sm.fileName).split('.')[0] + '_' + sm.frameMax + '_' + '.mp4' );
        
        const exec_line = 'ffmpeg -y -framerate 30 -i ' + in_file + ' -i ' + in_file_audio + ' -b:a 192k -pix_fmt yuv420p ' + out_file;
        const clean_line = 'find ' + videoAPI.pathJoin( sm.imageFolder, 'frame-*.png') + ' -delete';
        console.log('calling ffmpeg...');
        return videoAPI.exec( exec_line )
        .then( ( )=> {
            console.log('video done, calling find command to clean up...');
            return videoAPI.exec(clean_line);
        })
        .then( (data) => {
            console.log('clean up is done');
        });
    };
    window.ED = ED;
}());
