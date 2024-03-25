# videoground-samp-waveform

With this project the main focus is to create, and expand a collection of video files that have to do with waveform functions, as well as other waveform related topics in general. In a way this is just a continuation of what I have all ready started with in my beta world collection, however I now think I should have a whole other collection that is dedicated for this sort of thing if I am to keep moving forward with sound. In time what I work out here will result in even more collections like this, but for now I would just like to work out some general ideas for content.

## Getting started with a waveform function

The first few forms of the module that I have made for creating audio sample data work in part by defining a function that will be called for each sample value for an over all waveform sequence. Other functions outside of the waveform function will be used to define what final values should be for things like frequency, amplitude, and any additional values that should be in a given 'sampset' object that will be passed as the first argument. The second argument is then an alpha value \( 0 to 1 float value \) that reflects the current over all progress of the waveform. This alpha value will typically be tied to the over all progress of the video project, but can also be adjusted to any duration depending on the state of the code of the over all video project file.

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
