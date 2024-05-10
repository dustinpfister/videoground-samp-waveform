# bit_tracks project todo list

## RX - () - stereo
    * () if I have a updated samp create module that can do stereo there is doing things with that

## R2 - () - merge waveform, note code removed
    * (done) - can set a frequnecy of zero when using 'tone' mode
    * (done) - 1-bit waveforms should return 0 or 1
    * (done) - make sure than any value returned by a 1bit wavefrom converts to 0 or 1
    * (done) - merge waveform for cretaing a merge down final mix of the 1bit tracks
    * (done) - can set samp.amplitude to 0 for a 1bit waveform
    * (done) - remove code that has to do with notes
    * (done) - method to update samp objects of all tracks with an array of values from Music_roll.play
    * (done) - I might want to have more than one option with how to apply the final a\_note value when using apply music roll    
    * (done) - add pulse2a\_1bit waveform
    * (done) - have a track object option that will set how a\_note is to be processed 
    
    * (done) - have a pad a\_note mode
    
    * () - Setting a 1bit samp amplitude to something like 0.5 should result in 1 
    
    * () - mix waveform that allows for adjusting ampliude percent between tracks
    
    * () - just have a w option for create_disp_options in bit_samp_draw.js
    * () - have a common default object for tracks and mix options objects of create_disp_options in bit_samp_draw.js
    * () - new look for when using mix2 that displays the ampliude for each 1-bit track
    

        
## R1 - ( done 04/25/2024 ) - noise waveform, objects, modes
    * (done) - using an array of objects rather than all these arrays at the root tracks object
    * (done) - helper funcitons for working with notes
    * (done) - 1bit\_noise waveform function
    * (done) - modes for allowing for more than one way to set frequency
    * (done) - an optional a\_wave argument can be given when calling Bit_tracks.for_sampset         
    * (done) - bit_samp_draw : change to main draw function to get it to work with objects.     
    * (done) - I think that a amp value should be used over ni in waveform funcitons
    * (done) - the amp value should be used before even calling the 1bit waveform
    * (done) - allow for custom waveform functions

## R0 - ( done 04/09/2024 ) - first revision done
    * (done) - main bit tracks js file
    * (done) - 1bit pulse waveform function
    * (done) - main mix waveform working
    * (done) - can create a main tracks object
    * (done) - per frame and sample update methods.
    * (done) - a draw.js file that can be used in place of the samp create js file

