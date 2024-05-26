# waver todo list

## () - R0 - generator, for_samp, renderers
    * (done) I will need a main js file with code for writing wav
    * (done) have a built in generator for sin wave tone
    * (done) with read wav script I would like a get\_wav\_samples method working    
    * (done) I should be able to give start and end sample index values when calling this get\_wav\_samples method
    * (done) I should have a get wav total samples method so I know what kind of values to given when calling get wav samples method
    * (done) fixed bug that had to do with not cloning sample arrays
    * (done) get wav samples method should work with 8, 16, and 24 bit wav files both mono and stereo

    * (done) start a new waver\_gen.js file, starting with the read\_wav js file code, where the focus will be just on generators
    * (done) I will want to start a create\_samples generator function that is called to supply common options to the generator that I want to use

    <!-- wav generator -->
    * () start a wav generator that will read a wav file as a way to create samples
    * () the main gen function of a generator should return a promise
    * () the final sample format of the data should be in the 0 to 1 float range
    * () the generator should return an object with a samples property
    * () the samples property should be an array of arrays where each nested array is samples for a given channel
    
    <!-- tone generator -->
    * () start a tone generator that will create sample data from code
    * () have a built in sin waveform
    
    <!-- wav generator options -->
    * () wav generator options for reading just parts of a wav file
    
    <!-- for samp funcitons -->
    * () for\_samp functions: I will want to start a collection of built in for\_samp functions
    * () a for\_samp function will take generated sample data, and create a standard final data
    * () renderers: start a collection of functions that will render the final output ( wav, int text, 1-bit js array, one or many files, whatever ) 
    * () have a built in generator function for reading wav file source
    * () have a built in for\_samp function for conversion to n bit sample depth
    * () have init and done functions
    * () have a custom plugin format for defining how waver will work
    * () start one plugin format that will create array data to use with my 1bit waveform
   
