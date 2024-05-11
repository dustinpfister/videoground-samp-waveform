# midi-parser

This is a custom hackjob of midi-parser by colxi ( https://github.com/colxi/midi-parser-js/ ), as of this writing I just removed code that has to do with parsing base64 strings, and other formats other than a Uint8Array which is all I am to use for this. The main goal here is to have a tool to help in the process of converting midi to the plain text format that I use for my music roll project. I might want that to be a whole other project though so as long as this works good enough it might be a done deal.



## Delta Time values

I was first thinking that each delta time values is from the very start of the song. However it would seem that these delta time values are actually from the last event, or zero if there is no last event. So I would need to add these up to get the total time then. Also it would make sense to NOT sort the note on events by delta time values as they are all ready in the proper order.

https://music.stackexchange.com/questions/99362/time-in-midi-files
