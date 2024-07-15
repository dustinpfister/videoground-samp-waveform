# music_roll todo list

## () - R1 - Parse Paramaters
    * (done) parse paramaters as part of the over all parse process for line objects
    * (done) param property of a line object should be an plain object rather than an array instance
    * (done) defaul key names can be p0, p1, ect
    * (done) when setting frequency by way of value like -65, the result should be 65 and not 0
    * (done) new parse roll value helper function
    * (done) new regex for matching a contune \( '---' \)
    * (done) checking for continue pattern for each param
    * (done) the key names for the param object can be set by way of header command to the song object
    * (done) use the state of any trackN song object props to replace p0, p1, ect with key names
    * (done) can set artist, and album keys for a song object   
    * (done) parse roll values: check if the value should be int or not by looking for a .
    * (done) parse roll values: use n to mark a number as negative as - is used for spacing
    * (done) parse roll values: use some sort of char such as $ to declare the value as a string
    * (done) parse roll values: have a short hand for setting bool values
    * (done) fix continue bug where '-' will not result in a continue
    * (done) is continue helper function
    * (done) see about adressing a bug that happens when lines_per_minute=560 and rounding frames rather than secs in the player file
    * (done) start a new test folder to have at least one common test file to use to make sure the features are working as they should be
    * (done) update README to show source code of a full play file example.
    
    * () waveform param test file
    * () update README to show how to make use of waveform paramaters
    * () proof read readme file
    
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
    
