# music_roll todo list

## () - R1 - Parse Paramaters
    * () parse paramaters as part of the over all parse process for line objects
    * () param property of a line object should be an object rather than an array to help simplyfy the process of creating the final samp object used by the waveform function
    * () public funtion that can help to convert an array returned from Music_roll.play into a final samp object for a waveform function.
    * () can set artist, and album keys for a song object

    
## ( done 06/18/2024 ) - R0 - Just get the core idea of this working
    * (done) work out what the format will be for setting just pitch and amplitude
    * (done) start code that will parse the text into objects
    * (done) I will need a helper function to process counts to help with the note alphas
    * (done) I will want a playback function that will take an array of objects, and an alpha value
    * (done) playback function should return an array of objects to help set the samp values of the waveform function used
    * (done) frequency, and amplitude should be used in place of freq, and amp if that is the overall standard here
    * (done) parse method will return a main object with a line_objects property that contains the array of line objects
    * (done) the main object can contain properties such as lines\_per\_minute
    * (done) total_seconds value for main song object
    * (done) comments for the plain text format.
    * (done) header for plain text format
    * (done) can set lines per minute, and title by way of header
    * (done) more than one standard for setting frequnecy allowing for plain number values
    * (done) address isshue with setting track\_count in Music\_roll.parse 
    * (done) use new process text helper function to also process the main line objects, and header commands
    * (done) address isshue where I can not have two notes on the same freq
    * (done) fixed bug where I was not getting proper n and d values for the first note
    * (done) freq format should be three dashes --- or update code to work better with variable patterns
    * (done) rounding frequency
    * (done) update readme
    
