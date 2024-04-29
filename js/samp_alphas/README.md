# samp_alphas

There are a number of methods that help with alpha values in the samp\_tools.js file that I have as one of several files for samp\_create. However I think that the name of that file is vague, and I have the alpha methods grouped together with all kinds of other features. So I am thinking that I should in time retire the samp\_tools file in favor of several files that are less vague as to what they do, and this samp\_alphas file aims to be one of those.

This file then aims to replace what I have been using in the samp tools file for getting alpha values. As such this will contain some similar methods but also some new ones where the focus is working mainly with sample index values as the main values of interest when it comes to the numerator values used relative to denominator values such as how many samples per second, frame, ect. 

## What is an Alpha Value?

Simply put a number in the range of 0 to 1, a subject that comes up often in programming. There are many names for this kind of value actually, I have just come to call them alpha values. This file is then a collection of methods to help create these kinds of values in differing ways, and is geared more in the direction of doing so with sample index values, but in theory could be used outside of this kind of coding also.

## Methods

I oftren fail to write an overview of the feature of files such as this, but I think that I should put an end to that for at least this project to say the least.

### Samp_alphas.cell(sample_index=0, cell_size=1470, offset=0)

The cell method will give me a 0 to 1 alpha value with a given sample index value, and cell size. For example if I am using a sample rate of 44.1Khz I can use this to get an alpha value for the current given second by making the cell size 44100. An additional offset value can then be used to offset the alpha values of this cell like pattern for alpha values.

```js
const sec_alpha =   Samp_alphas.cell(i, 44100, 0);
const frame_alpha = Samp_alphas.cell(i, 1470, 0);
```

### Samp_alphas.range(sample_index=0, start_index=0, end_index=0)

I wanted a range method that will return 0 for any sample index, except for an index that is between or equal to a given start and end index value. For example say that I want an alpha value that will start 5% in and end at 35% in, I could so so with range if I have a way to get the index values that way.


```js
const r1_alpha = Samp_alphas.range( i, Math.floor(opt.i_size * 0.05), Math.floor(opt.i_size * 0.35) );
```

### Samp_alphas.linear(a=0, b=1, count=1, mod=true)

A simple linear alpha method based on the one from samp tools, but with one change which allows for me to choose when modoulo method to use. For most cases I will want to use the euclidean modulo method of the Math Utils object of threejs. However if for some reason I want to not use that I can set the mod argumnet to false.

```js
    console.log( Samp_alphas.linear(-2, 10, 1, true) );             //  0.8
    console.log( Samp_alphas.linear(-2, 10, 1, false) );            // -0.2
    console.log( Samp_alphas.linear(Math.abs(-2), 10, 1, false) );  //  0.2
```

### Samp_alphas.sin(a=0, b=1, count=1, mod=true)

Basic Math.sin alpha method that works on top of the linear alpha method for getting the raw alpha value that will be used with Math.sin.

```js
    console.log( Samp_alphas.sin(7.5, 10, 0.5, false) );  //  0.9238795325112867
```
