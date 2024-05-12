# midi-parser

This is a custom hackjob of midi-parser by colxi ( https://github.com/colxi/midi-parser-js/ ), as of this writing I just removed code that has to do with parsing base64 strings, and other formats other than a Uint8Array which is all I am to use for this. The main goal here is to have a tool to help in the process of converting midi to the plain text format that I use for my music roll project. I might want that to be a whole other project though so as long as this works good enough it might be a done deal.

## Delta Time values

I was first thinking that each delta time values is from the very start of the song, but after turning my brain back on and thinking about what midi is for a mintue I then relized that the delta time value is from the last event, or zero if there is no last event. This would of course make far mose sense when taking into acount that midi is not just a file format, but also a format for streaming music instruction data that is in real time so there is no way to know how long a full piece is if we are doing it live.

However if I am dealing with a file, then it is possible to run threw all the events and add up the total time of all the type 9 note on events. I can then use this total time value to get my ushual 0 to 1 alpha values for each event.

Also it would make sense to NOT sort the note on events by delta time values as they are all ready in the proper order.



## Resources

Delta Time Values
https://music.stackexchange.com/questions/99362/time-in-midi-files

Good General overview of midi format by javidx9 on YouTube.
https://www.youtube.com/watch?v=040BKtnDdg0&t=755s
