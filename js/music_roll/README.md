# music_roll

This is some code to work out a crude yet effective way of having a music score format that is like that of a [music roll](https://en.wikipedia.org/wiki/Music_roll). So in other words just a plain text format that is composed of a bunch of lines, each line then contains info such as pitch and amplitude. For this project at least I would like to keep things as simple as possible, reserving more complex features for other formats and projects outside of this one.

So then:

* () just pitch and amplitude
* () can allow for many tracks
* () functions to help with current note alphas

But then when it comes to things like bpm, and so forth that will all depend on addtional code in the video file.



## Format

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

