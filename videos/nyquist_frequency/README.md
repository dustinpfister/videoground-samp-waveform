# nyquist_frequency

In order to have at least one waveform cycle I need to have at least two samples to do so. This would mean then that there is a limit for pitch that is about half of whatever the sample rate is. There is a term for this which is nyquist\_frequency or folding frequency. For example at a sampling rate of 44100 Hz ( or 44100 samples per second if you prefer ),  the corresponding Nyquist frequency is 22050 Hz.

## video01-xx-pulse

The first few videos make use of a new pulse function that I started for this project that resolves problems that happen when approaching Nyquist frequency. I also worked out a whole lot of other expressions that have to do with how to go about increasing frequency from a start point forward to  Nyquist frequency and also started to touch base on a lot of other issues that come up. For one thing I am thinking in terms of Samples Per waveform Cycle \( SPC for short as it shows up in the code \), and then setting frequency based on that, and with that there are issues that come up when setting a start point for this value that starts high, and then goes down to 2 which in this case would be Nyquist frequency if we are thinking in terms of Samples Per Cycle rather than Hertz. 

Also with this first set of videos I started a new display that shows the current state of each sample, for each frame. This helps a lot for debugging purposes, but is also kind of cool to look at as various patterns start to show up.


## New Visual display that will show sample state on frame by frame basis

The aim with this project then is to create some video files in which I explore this topic of  Nyquist frequency  more. While doing so I can also have a new display for the content that will show what the current deal is on a sample, by sample basis. What I mean by that is having a way to display how many samples per waveform cycle there are given the current pitch. This would mean having a visual display of each sample, for each frame of the video. So again if we are taking a 44.1 Khz sample rate, this would mean showing the state of 1470 samples on any one given frame at 30 Frames Per Second.

## Problems with hertz fractions, setting total time to any value, ect

Ran into a lot of problems that have to do with hertz fractions, setting total time of the video to any value, the rate at which frequnecy changes over time, so forth. Of course when I have any frequnecy value that has a fraction that will be that I will have a fraction of a waveform cycle resulting in this poping noise every second. One might think that all I will have to do then is just round and that will be the end of it but this is just one problem that seems to come up. There are all kinds of other distorations that can happen that are the result of things like updating frequnecy to fast, or two slow. A lot of other problems seem to have to do with setting the length of the video to any time that I want. As a result of this I ended up making a lot of drafts, trying to come up with a good system for just incresing frequnecy over time.

 

## Discovered a Problem with the Alpha values I was using for waveform cycles

I should have started this project a long time ago, but better late than never. Anyway while working on the very first video for this project I have noticed a significant problem with the alpha value ( 0 to 1 value ) that I was using to find the current state of a waveform. The expression I was using was this:

```js
const a_cycle = samp.frequency * a_wave % 1;
```

For the most part this expression works fine, but there are a few edge cases where it will cause unexpected results. The problem has to do with values like 0.4999.. where 0.5 is desired. I was sample to fix this by using the same expression, but then using the value to create another alpha value from it that is based on a fixed number of points for a cycle.

An example of the old pulse waveform function that I would use in videos would look like this:

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

This new pulse waveform function seems to address the problems that I have noticed when using the old pulse waveform function, and I now get desired results when a frequency reaches the folding frequency. Now the result is every other sample being set to alternative values rather than the weird situation that would happen with the old pulse waveform function.

## Setting a samples\_per\_cycle SPC, then setting Frequency based on that.

There is setting frequency at a given start point such as 80 hertz and then going up to 22,050 hertz. However another way of thinking about this is in terms of how many samples per waveform cycle and then figuring out what frequency is based on that. So then 2 samples per waveform cycle should always be Nyquist frequency, and then as the samples per waveform cycle approach the sample rate, the frequency will go down from Nyquist frequency to 1 hertz. Alliteratively this samples per cycle value can start at the sample rate, and then go down to 2 as a way to let pitch run threw the full range.

So then something like this then:

```js
//start spc at at sample rate and go down to 2 from there.
const spc = sud.samples_per_cycle = sample_rate - Math.floor( (sample_rate - 1) * a_sound);
samp.frequency = sample_rate / spc;
```
However this results in a video in which the overwhelming volume of the content is very low frequency sound with the last bit of the content starting to go threw the higher frequency should. One way to adjust for that might be to think more in terms of samples per frame, rather than samples per second.

```js
const spf = sample_rate / 30;
const spc = sud.samples_per_cycle = Math.floor(spf - ( spf - 2 ) * a_sound );
samp.frequency = sample_rate / spc;
```

However the best way to deal with this might be to just keep things as they are, and look into other expressions for alpha values other than just a simple linear progression.


## Main Video alpha value expressions

Another isshue that I discovered while working on the first video for this project has to again to do with some typical alpha values that I use when making a video. Most of the time I go with just a simple frame over max frame value as a way to update things over the course of a full video. However there are a few alternative expressions for this that I have found that I need to use now and then as they do have a small but present impact and precision.

In some cases I find myself adding to the frame index, or subtracting from the total frame count for example.

```js
const a_sound3 = ( frame + 0 ) / ( max_frame - 1 );
```

There is also making use of other methods that follow a curve rather than a straight line when graphed.


