# bit_tracks project todo list

## RX - () - stereo
    * () if I have a updated samp create module that can do stereo there is doing things with that

## RX - () - saw filter
    * () optional saw filter for each final mix option

## R2 - () - merge and mix2 waveforms, note code removed
    * (done) - can set a frequnecy of zero when using 'tone' mode
    * (done) - 1-bit waveforms should return 0 or 1
    * (done) - make sure than any value returned by a 1bit wavefrom converts to 0 or 1
    * (done) - merge waveform for cretaing a merge down final mix of the 1bit tracks
    * (done) - can set samp.amplitude to 0 for a 1bit waveform
    * (done) - remove code that has to do with notes
    
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

