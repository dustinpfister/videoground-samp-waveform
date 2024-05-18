# export_done

In R0 of videoground I added a feature to allow for setting a function that will be called when exporting of frames is done. This funciton can then be used to call some commands that I would like to run to do something with the frame images. The main thing that comes to mind is to call ffmpeg to create a final mp4 file, but I could also run some other commands such as using the find command to delete the frames once the final mp4 file is created.

When it comes to using this feature there is at least one typical use case that I will want to use over and over again from one video to the next. So it would make sense to pull that code into a file such as what I have going on here.

```js
// commands used for video only, and video + audio
// ffmpeg -framerate 30 -i frame-%06d.png -pix_fmt yuv420p raw.mp4
// ffmpeg -framerate 30 -i frame-%06d.png -i video.wav -b:a 192k -pix_fmt yuv420p raw.mp4
// Maybe use this feature to automate cleanup?
// find frame-*.png -delete
const export_done = (sm) => {    
    const in_file = videoAPI.pathJoin( sm.imageFolder, 'frame-%06d.png' );
    const in_file_audio = videoAPI.pathJoin( sm.imageFolder, 'video.wav' );
    const out_file = videoAPI.pathJoin( sm.imageFolder, 'raw.mp4' );
    const exec_line = 'ffmpeg -y -framerate 30 -i ' + in_file + ' -i ' + in_file_audio + ' -b:a 192k -pix_fmt yuv420p ' + out_file;
    const clean_line = 'find ' + videoAPI.pathJoin( sm.imageFolder, 'frame-*.png') + ' -delete';
    videoAPI.exec( exec_line )
    .then( (data) => {
        console.log( 'looks like that went well' );
        return videoAPI.exec(clean_line);
    })
    .then( (data) => {
        console.log('clean up is done');
        console.log(data)
    });
};
```
