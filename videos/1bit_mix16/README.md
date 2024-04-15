# 1bit_mix16

The general idea here is to have more than one 1-bit track, however when it comes to creating a 16-bit mix I am not merging down and then scaling up. Alliteratively I am scaling up to 16bit for each track, then sense I have 16bit tracks I can then mix as usual. As such this results in having more then one 1bit track that is played in parallel without having to prioritize one track over that of another. This might not be true 1-bit sound then, but nothing uploaded to YouTube truly is to begin with as sound must be a minimum of at least 16bit sample depth.

## Goals for the project

The goal is to just get started with a general idea of what I want to do when it comes to 1-bit sound and music. As of this writing I all ready have the core idea of what I want working, and now it is just a question of how many videos I want to make, and if this will result in some kind of long term project or not. Apart from just mixing upscaled 1-bit sound tracks there are a lot of other things I might want to refine while working on this that have to do with custom waveform functions, ways to store music tracks, and many other changes that migth result in improved javascript code that is used for createing sample data to begin with.

  * ( done ) Core Idea of the project working
  * ( done ) New look started for the project with custom draw.js file
  * ( done ) start a bit\_tracks.js R0 file that will contain reusable code for this project and any others based on what I start here
  * ( done ) start an R1 of bit\_tracks.js that I will contain improvements as I work out more video01-xx-text videos
  * ( done ) helper function for cretaing notes arrays
  
  * () video01-03-test-noise - work out a noise waveform
  * () video01-04-test-raw - work out a raw data waveform
  * () video01-05-test-samppitch - I might want to see about adjusting pitch bay way of sample by sample rather than frame by frame
  

### Core idea of project working ( done in video01-01-test-2tracks )

The first and formost goal here is to just work out what the core idea of the project is of course. So I have started this project off with a very basic test video where I am just working with two 1bit tracks that are used to produce a final 16-bit 44.2kHz mono track that just serves as the first proof of concept of this project.


<div align="center">
      <a href="https://www.youtube.com/watch?v=0Jsbznfcudc">
         <img src="https://img.youtube.com/vi/0Jsbznfcudc/0.jpg" style="width:50%;">
      </a>
    <p>
video01-01-test-2tracks.
    </p>
</div>


### Updated Look with bit_samp_draw.js file in place of main samp_draw.js

For this project I started a new samp_draw.js file starting with the code that I all ready have in place for this. Functions that are not beging usesd for this project where removed, and addtional code that will be used for this was added to this copy of the file. This might be soemhting that I should concider doing on a project by project basis anyway as each time I start a new project that is a chance to start a whole new look and over all feel of the video content after all.

### Custom 1-bit Waveform Funcitons

I will want to work out a few custom waveform functions for this project. As of this writing I have all ready started a custom pulse waveform function. I will want to expand this by making a noise waveform as well that will also work with 1-bit, but might also what to work out one that will read raw 1-bit data also. The raw data tool will then be used as a way to playback any kind of binary data including sound samples that are converted to 1 bit sample depth.


## IDEAS FOR ADDITIONAL PROJECTS BASED ON WHAT I HAVE STARTED IN 1BIT_MIX16

Once I have the general idea of what I want to do working okay here I can move on to starting some additional projects.

### Merge down project

The merge down project might just need to be the same code I worked out here, just with a whole other function for creating the final 16bit mix.

### Better Standards for Storing Music

I would like to have one or more standards for working out what the music should be for each track in terms of at least pitch and timing. I might want to just import from a standard such as MIDI, which will be fine for pitch and timing, however there is also things like changing the duty cycle when using the pule waveform, and other waveform spicific values. I might be able to do this by just extending JSON exports from MIDI files, in any case I think it would be best to have both MIDI files and JSON exports where I can do any werid custom stuff I might need to do.

### 24-bit/16-bit to 1-bit conversion tools

When it comes to the content of tracks the main idea that I have is to generate the 1bit sample data using javaScript code alone. However I would like to also create a few tracks that is created by way of raw 1-bit sample data. This raw 1-bit sample data can be in some kind of text format where each bit is actualy 1 byte, however if I work out some kind of binary format that might be a better option. In any case I will want to create some tools for generating whatever the format is from 24-bit and 16-bit mono wav files.
