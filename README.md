# videoground-samp-waveform

The aim here is to have a collection of video files that have to do with waveform functions, as well as various things that branch off from there. This is also a continuation of what I have all ready started with in my [beta world collection](https://github.com/dustinpfister/videoground-beta-world) when it comes to sound syntheses, it is just that here I am focusing on this topic alone.

## Note worthy projects thus far

Thus far I am still trying to get a good idea of what ideas I should be focusing on over others when it comes to the logic of waveform functions, as well as many other aspects of sound such as sample depth, mixing, and so forth. For my own sake as well as anyone that might have interest in what I am doing here I think I should have a main list in this read me file that I update now and then that will help with this.

### [1bit\_waveforms](https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/1bit_waveforms)

I have started a 1bit\_waveforms project which as the name sugests is an exploration of waveform functions that will return only a 0 or 1 in terms of sample depth. There is just starting out with pulse and noise waveforms, but I would like to work out at least a few more with this.

### [1bit\_mix16](https://github.com/dustinpfister/videoground-samp-waveform/tree/master/videos/1bit_mix16)

One major project that I have together thus far has to do with 1-bit sound and how a final 16-bit track will be mixed from two or more 1-bit tracks. There are two general ideas for mixing that come to mind with this, merge down the 1-bit tracks into a single 1-bit track and then scale up to 16-bit, or scale each 1-bit track to 16-bit and mix as usual allowing for all 1-bit tracks to play at once without loss. This 1bit\_mix16 project is then the latter rather than former with this which I think would be better when it comes to making content that will be uploaded to YouTube rather than something that needs to run on retro hardware.


## Getting started with a waveform function

The first few forms of the module that I have made for creating audio sample data work in part by defining a function that will be called for each sample value for an over all waveform. Other functions outside of the waveform function will be used to define what final values should be for things like frequency, amplitude, and any additional values that should be in a given 'sampset' object that will be passed as the first argument. The second argument is then an alpha value \( 0 to 1 float value \) that reflects the current over all progress of the waveform. This alpha value will typically be tied to the over all progress of the video project, but can also be adjusted to any duration depending on the state of the code of the over all video project file.

The return value of a waveform function should then be in -1 to 1 float format. The final value that will be used will then of course depend on what thew final sample depth is. As of this writing I am going with 16 bit signed integers.

A simple pulse waveform function might look something like this then:

```js
CS.WAVE_FORM_FUNCTIONS.pulse = (sampeset, a_wave ) => {
    const duty = sampeset.duty === undefined ? 0.5 : sampeset.duty;
    const a = sampeset.frequency * a_wave % 1;
    if(a < duty){
        return  -1 * sampeset.amplitude;
    }
    return sampeset.amplitude;
};
```

## Videoground

This repo is one of several projects that work on top of my electionjs project that I call [videoground](https://github.com/dustinpfister/videoground). This is my own tool that I have made for creating any kind of video project that involves generating a whole bunch of image files for each frame, and also any additional assets such as a wave file that can then be used to create a final video project with ffmpeg. Getting into this project in detail is outside the scope of this read me file of course, but if you are trying to get this working on your end you will also need videoground to run the content here.


