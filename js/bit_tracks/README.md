# bit_tracks project

This is a JavaScript file that I started for my 1bit\_mix16 project, but now think that it would be best to make this a main js folder project. I would like to reuse this code across many other 1bit projects rather than just the 1bit\_mix16 project such as the 1bit\_merge project and any additional 1-bit audio projects that I might work on in the future.

## Current goals for bit_tracks.js

With R0 of the project I just got a very basic core idea of what I wanted with this up and running with a single 1-bit waveform function that is a kind of pulse waveform, and a single waveform function for creating the final 16bit mix that will be the audio content uploaded to YouTube. With that said this is of course the most important aspect of this project as I will not be using this code to create content that will run on some kind of retro hardware, but rather YouTube video content. Thus the main thing here is how to go about making the final 16 or 24 bit final mix from one or more 1-bit mono tracks. With R1 I added an additional built in waveform function that is a basic noise waveform, some code that has to do with notes, allowed for making custom waveforms on a video by video basis as needed, and also made a number of additional improvements.

Now with R2 forward I am starting to think not just in terms of what I need to add to with bit\_tracks, but also what I should remove from it as well. There is starting to think in terms of additional mixing methods such as merge, and other mixing options that get away from the limitations of raw 1-bit sound. However I am now thinking that some of the code that has to do with notes should be removed in favor of other projects that can be used with bit\_tracks, bit also additional audio projects outside of bit_tracks as well.

