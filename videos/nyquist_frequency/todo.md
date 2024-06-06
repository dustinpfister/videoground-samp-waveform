# nyquist_frequency todo list

## () - draft03-01-arr-cycle-alpha
    * I would like to have video03-xx forward make use of an array that is used to define the nature of the waveform

## () - draft02-03-sin-cycle-alpha
    * (done) the core idea is to use cycle-alpha as the value for samp.awave
    * (done) so I will need a sin waveform function that is designed this way.
    * (done) I can then start to create a fixed number of cycles, and sample per cycles value 
    
## ( done 06/06/2024 ) - draft02-02-sin-arrfilter
    * (done) try out the same code as with video01-02 only using a sin waveform

## ( done 06/06/2024) - draft02-01-sin-updates-per-frame
    * (done) using a sin waveform rather than pulse
    * (done) use samp debug to see what is going on with each sample    
    * (done) work more on R0 of samp debug adding functions to hep get more detail about the state for each sample
    * (done) see about using the a_update and int values for frequnecy in a draft to adress isshue realted to fractions of waveform cycles
    
## ( done 06/03/2024 ) - draft01-05-pulse-duration-by-samples
    * (done) start a draft project where the goal is to create a video in terms of the number of samples needed, rather than setting to a fixed number of seconds

## ( done 06/03/2024 ) - start video02-xx-sin, and drafts
    * (done) start video02-xx-sin set of videos using a sine waveform
    * (done) strat a drafts folder for this project that will contain video files that I will not be making vinal videos with
    * (done) rename video01-02, and video01-03 to drafts as I think that I have rushed things here

## ( done 06/01/2024 ) - video01-03-pulse-735-2spc-update-count
    * (done) video in which a fixed number of updates are used for spc over the course of the video
    * (done) the count of updates could be one per frame, or 4 per frame, ect
    * (done) starting at 735 spc (60 hertz)

## ( done 05/31/2024 ) video01-02-pulse-1k-2spc-noround
    * (done) same as video01-01 only no rounding
    * (done) should still have the samples per cycle fixed to a a given precision
    
## ( done 05/31/2024 ) video01-01-pulse-1k-2spc
    * (done) new pulse waveform function that works as exspected for high frequencys
    * (done) new display that shows the current state of each sample for each frame
    * (done) have a system for setting a start point for samples per cycle 
    * (done) update on a sample by sample basis, not frame

