# music_roll

This is some code to work out a crude yet effective way of having a music score format that is like that of a [music roll](https://en.wikipedia.org/wiki/Music_roll). So in other words just a plain text format that is composed of a bunch of lines, each line then contains info such as pitch and amplitude. For this project I would like to keep things simple, at least for R0 of the project, but this is still far more complex than the simple array of pitch values system that I found myself starting out with.

## Plain text Format

If I want to have a music roll system, then I will need some kind of plain text file format to read and turn into the final song object format. If I am going to bother with a plain text format then it should be more readable and workable then the JSON format when it comes to composing music with a plain old text editor. A feature of this format that I should add right of the bat then is comments as that is one major thing that I can not have in JSON.

```
>title='test song for three tracks shorts'
>lines_per_minute=600;
#
# measure 1;
#
c-5 1;--- -;e-3 1;
--- -;--- -;--- -;
c-5 1;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;e-3 1;
--- -;--- -;--- -;
c-5 1;--- -;e-3 1;
--- -;--- -;--- -;
c-5 1;--- -;e-3 1;
--- -;--- -;--- -;
c-5 1;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;--- -;
--- -;--- -;--- -;
c-5 1;--- -;--- -;
--- -;--- -;--- -;
```

## Basic use case example

It would be best to look at the source code of some of the videos that have been made thus far as a way to figure out how to get started. However I will of course write a thing or two about this here. The general idea is to one way or another get access to text that is in the music roll format that is described above in this readme. Once I have the roll text I can pass that to the parse method to get a workable song object. Once I have the song object I can use the play method of music roll to get a current array of samp objects that I can then in turn use with the waveform functions of my over all player file

```js

    // use the parse method to create a song object from text
    const song_obj = Music_roll.parse( song );
    const sound = sud.sound = CS.create_sound({
        waveform: custom_waveform,
        for_sampset: ( samp, i, a_sound, fs, opt ) => {
            // use the play method to get an array of samp objects for each track in the roll
            const array_samp = Music_roll.play(song_obj, a_sound);
            // do somehting with the array of samp objects
            // this will depend on the state of the functions used to create
            // sample values  
            return samp;
        },
        // the total_secs value can be used to set the duration of the video     
        secs: Math.ceil( song_obj.total_secs )   
    });
```
