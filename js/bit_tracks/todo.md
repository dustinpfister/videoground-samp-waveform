# bit_tracks project todo list

## R2 - () - merge waveform, notes_block
    bit\_tracks.js :
        * () - remove code that has to do with notes, and place it in a notes\_nums js file
        * () - merge waveform for cretaing a merge down final mix of the 1bit tracks
    notes\_nums.js :
        * () - new note nums js file that is the code from bit tracks that has to do with cretaing notes
    notes_block.js :
        * () - new notes block js file where the aim is to have a json format for notes
        

## R1 - () - noise waveform, objects, modes
    bit\_tracks.js :
        * (done) - using an array of objects rather than all these arrays at the root tracks object
        * (done) - helper funcitons for working with notes
        * (done) - 1bit\_noise waveform function
        * (done) - modes for allowing for more than one way to set frequency
        * (done) - an optional a\_wave argument can be given when calling Bit_tracks.for_sampset
        
        * () I think that a amp value should be used over ni in waveform funcitons
        * () the amp value should be used before even calling the 1bit waveform
         
    bit\_samp\_draw.js :
        * (done) - change to main draw function to get it to work with objects.       

## R0 - ( done 04/09/2024 ) - first revision done
    bit\_tracks.js :
        * (done) - main bit tracks js file
        * (done) - 1bit pulse waveform function
        * (done) - main mix waveform working
        * (done) - can create a main tracks object
        * (done) - per frame and sample update methods.
    bit\_samp\_draw.js :
        * (done) - a draw.js file that can be used in place of the samp create js file

