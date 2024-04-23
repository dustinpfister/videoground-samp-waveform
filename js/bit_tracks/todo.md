# bit_tracks project todo list

## R2 - () - merge waveform, music-objects
    * () - 1-bit waveforms should return 0 or 1
    * () - remove code that has to do with notes, and place it in a music\_nums js file
    * () - merge waveform for cretaing a merge down final mix of the 1bit tracks
    * () - new music-nums js file that is the code from bit tracks that has to do with cretaing notes
    * () - new music-objects js file where the aim is to have a json format for notes and music
        

## R1 - () - noise waveform, objects, modes
    * (done) - using an array of objects rather than all these arrays at the root tracks object
    * (done) - helper funcitons for working with notes
    * (done) - 1bit\_noise waveform function
    * (done) - modes for allowing for more than one way to set frequency
    * (done) - an optional a\_wave argument can be given when calling Bit_tracks.for_sampset         
    * (done) - bit_samp_draw : change to main draw function to get it to work with objects.       
        
    * () - I think that a amp value should be used over ni in waveform funcitons
    * () - the amp value should be used before even calling the 1bit waveform
    * () - allow for custom waveform functions

## R0 - ( done 04/09/2024 ) - first revision done
    * (done) - main bit tracks js file
    * (done) - 1bit pulse waveform function
    * (done) - main mix waveform working
    * (done) - can create a main tracks object
    * (done) - per frame and sample update methods.
    * (done) - a draw.js file that can be used in place of the samp create js file

