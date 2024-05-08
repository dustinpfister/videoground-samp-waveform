# music_roll

This is some code to work out a crude yet effective way of having a music score format that is like that of a [music roll](https://en.wikipedia.org/wiki/Music_roll). So in other words just a plain text format that is composed of a bunch of lines, each line then contains info such as pitch and amplitude. For this project I would like to keep things simple, but this should still be for more complex then the kind simple music numbers system that I often find myself using for this kind of thing.

So then the core features should be :

* ( done in R0 ) just pitch and amplitude
* ( done in R0 ) can allow for many tracks
* ( done in R0 ) functions to help with current note alphas

Once I have the most basic features working I would also like to at least start some of the more advanced features right alway in R0

* (  ) parse a song into a main object that contains a lines property
* (  ) can have comments in the plain text format
* (  ) can set header info in plain text format 

## Plain text Format

If I want to have a music roll system, then I will need some kind of plain text file format to read and turn into the final objects format. With that said I should also have a JSON format witch will work by just parsing the JSON directly into the the workable object for the system. If I am going to bother with a plain text format then it should be more readable and workable then the JSON format when it comes to composing music with a plain old text editor.

So then maybe something like this : 

```
-- -; -- -;
-- -; -- -;
-- -; -- -;
f5 1; c1 1;
-- -; -- -;
f5 1; -- -;
-- -; -- -;
f5 1; -- -;
-- -; -- -;
g5 1; -- -;
-- -; -- -;
f5 1; -- 0;
-- -; -- -;
f5 1; -- -;
-- -; -- -;
c5 1; -- -;
-- -; -- -;
-- -; -- -;
-- -; -- -;
-- 0; -- -;
```
