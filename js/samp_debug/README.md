# samp_debug

I would like to have at least a basic function for loging sample data as plain old text files on a frame by frame basis. That is to just have a function that will tender a text file for each frame and in each text file there will be the audio data as numbers for each sample. So then if the sample rate is 44.1kHz than means 44100 samples for each second, or 1470 samples for each frame. If the audio is just 1 second this will mean 30 text files with each file containing 1470 numbers where each number is a a given sample value. The whole point here then is to just have a more fine grain way of looking at the sample values that are being used in plain text format.

## CDB.write_text_samples - write an array of sample data to a text file

When it comes to the first method that I started for this project I just wanted to write an array of sample data that I have to work with in the VIDEO.update method of various video projects. This array of sample data is just simply that, so the output of the files contains samples for each frame and nothing else.

If using R0 of samp\_create I would want to do somehting like this:

```js
VIDEO.update = function(sm, scene, camera, per, bias){
    const sud = scene.userData;
    sud.data_samples = CS.create_frame_samples(sud.sound, sm.frame, sm.frameMax );
    if(sm.isExport){
        return CS.write_frame_samples(sud.sound, sud.data_samples, sm.frame, sm.imageFolder, sm.isExport)
        .then( () => {
            return CDB.write_text_samples(sud.data_samples, sm.frame, sm.imageFolder  );
        });
    }
};
```

## Future Goals with samp_debug

The name should say it all when it comes to this project, the point of this is to have tools to help in the process of debugging problems that I run into when writing javascript code that has to do with cretaing audio sample data. Just plain text output is a good start, but in time I might also want to make addtional tools to help get a good sense of what is going on. Apart from cretaing just simple text files there is also maybe writing html files that display not just the number values for each sample of a frame, but also render one or more graphs using canvas elements to give a great vishual idea of what is going on.
