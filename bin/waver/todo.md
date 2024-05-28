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
    * (done) start a wav generator that will read a wav file as a way to create samples
    * (done) the main gen function of a generator should return a promise
    * (done) the final sample format of the data should be in the 0 to 1 float range
    * (done) the generator should return an object with a samples property
    * (done) the samples property should be an array of arrays where each nested array is samples for a given channel
    * (done) The final object from the generator should also give sample_rate, total_samples, and channels props
    * (done) start a waver\_forsamp script
    * (done) start with just some dummy data in the format of what a generator will create
    * (done) for\_samp functions: I will want to start a collection of built in for\_samp functions
    * (done) a for\_samp function will take generated sample data, and create a standard final data
    * (done) the first built in example can be a to n-bit example
    * (done) start a final waver.js file in root of R0 folder
    * (done) start final lib folder with waver gen, and waver forsamp drafts
    
    <!-- start renderers -->
    * () start a collection of functions that will render the final output ( wav, int text, 1-bit js array, one or many files, whatever ) 
    * () have a text\_json renderer that will write a single text file that is a json file of the final result object for starters
    
    <!-- more work on for samp module -->
    * () for samp functions should work with more than one channel
    * () I will want to be able to give custom options for each forsamp function used
    * () can give a string for a built in for samp function, or an object for a custom one.
    * () should be able to call a few for samp functions in order
    
    <!-- more work on renderers -->
    * () have an option for the json renderer that will create a collection of json files for large audio files
    * () start a wav renderer
    
    <!-- tone generator -->
    * () start a tone generator that will create sample data from code
    * () have a built in sin waveform
    
    <!-- wav generator options -->
    * () wav generator options for reading just parts of a wav file
       
    <!-- external plugins -->
    * () update waver gen to allow for using a string, or an object for a generator
    * () have init and done functions
    
