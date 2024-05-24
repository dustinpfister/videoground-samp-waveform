# waver

What I want to do with this project is have a way to log out sample data from a wav file in a number of formats. The first and foremost reason I want to do this is to just have a basic tool for creating 1-bit sample depth data from 8, 16, and 24 bit sample depth wav files, but I am sure I will end up with many other uses for this. Also I would like to have something that is much more than just a simple conversion tool, but rather a great all around command for working with wav files both for reading them, and creating them from code.

## Starting Goals

    * (done) have updated code for reading the state of a wav file based on what I have in samp\_create R0.
    * () have a solid format for a 'generator'
    * () have a way to extend functionality by using a custom file that defines logic to call for each sample index
    * () can convert from a wav source, or generate from code


## Generators

First off I think one of the most important things to get solid right away with this is a decent standard for a 'generator'. This generator is code that will create sample data to begin with, and then present it in a standard format to one or more 'for\_sample' functions. So then there is having a generator that will read raw data from a wav file that can be 8, 16, or 24 bit in terms of sample depth, and then also have 1 or more channels as well. So then the sample data will be in a range of values, and there could be one or more arrays of data depending on the number of channels. However the end format that I would want with the for sample functions should be the same.

So for sample data I might want to have some kind of format where I have an array of arrays and each array will contain sample data in a 0 to 1 number range.
    
    
    
