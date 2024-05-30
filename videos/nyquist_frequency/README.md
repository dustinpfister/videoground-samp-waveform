# nyquist_frequency

In order to have at least one waveform cycle I need to have at least two samples to do so. This would mean then that there is a limit for pitch that is about half of whatever the sample rate is. There is a term for this which is nyquist\_frequency or folding frequency. For example at a sampling rate of 44100 Hz ( or 44100 samples per second if you prefer ),  the corresponding Nyquist frequency is 22050 Hz.

## New Visual display that will show sample state on frame by frame basis

The aim with this project then is to create some video files in which I explore this topic of  Nyquist frequency  more. While doing so I can also have a new display for the content that will show what the current deal is on a sample, by sample basis. What I mean by that is having a way to display how many samples per waveform cycle there are given the current pitch. This would mean having a visual display of each sample, for each frame of the video. So again if we are taking a 44.1 Khz sample rate, this would mean showing the state of 1470 samples on any one given frame at 30 Frames Per Second.

## Discovered a Problem with the Alpha values I was using for waveform cycles

I should have started this project a long time ago, but better late than never. Anyway while working on the very first video for this project I have noticed a significant problem with the alpha value ( 0 to 1 value ) that I was using to find the current state of a waveform. The expression I was using was this:

```js
const a_cycle = samp.frequency * a_wave % 1;
```

For the most part this expression works fine, but there are a few edge cases where it will cause unexspected results. The problem has to do with values like 0.4999.. where 0.5 is desired. I was sample to fix this by using the same expression, but then using the value to create another alpha value from it that is based on a fixed number of points for a cycle.

An example of the old pulse waveform funciton that I would use in videos would look like this:

```js
const pulse_old = (sampeset, a_wave ) => {
    const duty = sampeset.duty === undefined ? 0.5 : sampeset.duty;
    const a = sampeset.frequency * a_wave % 1;
    if(a < duty){
        return  -1 * sampeset.amplitude;
    }
    return sampeset.amplitude;
};
```

The new pulse waveform function that I have made for this nyquist\_frequency project now looks like this:

```js
const pulse_new = (samp, a_wave) => {
    const duty = samp.duty === undefined ? 0.5 : samp.duty;
    const max_points = samp.max_points === undefined ? 100 : samp.max_points;
    const a_cycle = samp.frequency * a_wave % 1;
    const cycle_points = Math.round( a_cycle * max_points) % max_points;
    const a_cp = cycle_points / max_points;
    if(a_cp < duty){
        return -1 + samp.amplitude * 2;
    }
    return -1;
};
```

This new pulse waveform function seems to adress the problems that I have noticed when using the old pulse waveform function, and I now get desired results when a frequency reaches the folding frequency. Now the result is every other sample being set to alternbative values rather than the werid situation that would happen with the old pulse waveform funciton.

## Setting a samples\_per\_cycle SPC, then setting Frequency based on that.



## Main Video alpha value expressions



