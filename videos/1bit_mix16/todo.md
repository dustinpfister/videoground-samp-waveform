# 1bit_mix16 todo list



## () - video01-xx-test-music-objects
* () start a new main js module called 'music\_objects' and start R0 of the module
* () start with what I all ready have worked out in video01-06-note-alpha
* () this video will be the first test video when working on this

## () - video01-08-test-sample-alphas
* (done) I would like to work out some code that has to do with 'sample alphas'
* (done) This involves making functions that will take a sample index value as one of the arguments
* () have a get sample alpha method that takes a start and end sample index and returns an alphas between the two


## ( done 04/25/2023 ) - video01-07-test-custom-waveform
* (done) I will want to have the option to give a custom 1-bit waveform function to use
* (done) have two tracks in which I am testing out differing options for the custom waveform

## ( done 04/25/2024 ) - video01-06-test-note-alpha
* (done) just work out a simple demo of note alphas
* (done) use these note alphas to set pitch on sample by sample rate, and use plain old awave value
* (done) more refined methods in line with the task of creating more than one song object
* (done) work out note alphas, and use it to adjust pitch for each note
* (done) have a get note alpha helper function 

<!-- 
    sample by sample alphas?
    
    There seems to be all kinds of problems when adjusting frequnecy on a sample by sample basis
    This must have something to do with the a_wave value used in conjunction with the frequnecy values
    That is that 80 hertz over a second is indeed 80 over a second, but if I start at 0 hertz and go
    up to 80 hertz, by then end of the the second a frequency of 80 would be much higher.
    
    The soultion to this would involve a new formula for a_wave values, or just stick to the same old
    per second a_wave value and figure out how to adjust frequnecy to get the desired outcomes. In any case
    At the time of this writing it would seem that my note alpha values are working just fine, and I have found
    no problems in the bit_tracks.js file or any other code. It might be best to just wrap up this video
    with a simple 0 freq pading function between notes for now, and explore this subject further in another video.

-->

* (done) just have a simple 0 frequnecy padding function for now
* (done) work out two tracks for this

## ( done 04/22/2024 ) - video01-05-test-pitch
* (done) I would like to demo another use of the 'tone' mode
* (done) This can also be a test of sample by sample change of frequency

## ( done 04/22/2024 ) - video01-04-test-awave
* (done) use 'tone' mode and adjust the freqency used over time
* (done) test out new optional a_wave method when using Bit_tracks.for_sampset
* (done) there seems to be a problem here when setting frequency, look into it
* (done) I would like to have better debug tools that will write out plain text sample data as many files
* (done) frequnecy looks good, sample data also, but I need an expression that will work well for the awave value used
* (done) For this video at least I think I will just demo an awave value, and maybe look into this more as another project

## ( done 04/18/2023 ) - video01-03-test-noise
* (done) see about starting a noise waveform function for R1 of bit tracks
* (done) have a three track tune for lows, highs, and noise
* (done) track objects in R1 of bit\_tracks.js
* (done) modes for setting how to get the current state of freq for a waveform
* (done) work out a final tune for this video

## ( done 04/15/2024 ) - video01-02-test-notehelper
* (done) new note format for making a song
* (done) note helper funcitons in new r1 version of bit_tracks js file
* (done) new tune 

## ( done 04/09/2023 ) - video01-01-test-2tracks - core idea working
* (done) core idea working
* (done) mixing two 1 bit tracks



