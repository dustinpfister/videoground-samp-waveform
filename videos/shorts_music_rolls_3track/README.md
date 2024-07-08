# shorts_music_rolls_3track

This project aims to be a collection of YouTube shorts all of which are composed of three tracks, no more, no less. This allows for me to work more so on my music roll code, making any needed changes with the system in place. I can also come up with new waveform functions to be used for any one of the three tracks. Another nice thing about this is keeping the duration of the music rolls under one minute as music composition can prove to be time consuming. Also speaking of music roll files I am also starting to go in a new direction that involves creating just one ‘player’ javascript file, and then creating many final videos with that same player file by making more than one external music roll file to use with it.

## External Music Roll format

I might want to take a whole new approach with this project that involves just making one video JavaScript file that acts as a kind of player for more than one external music roll file. I am also thinking that a good location for these music roll files should be off of the root folder of the whole videoground-samp-waveform repo as I will likely want to reuse these roll files in other video projects such as 1bit\_music\_rolls, and 1bit_\merge_\down just to name two.

## Using Buffer Geometry to display sample data

While working on the first draft of this project I started using THREE.BufferGeometry as a way to display the current state of what is going on in terms of audio sample data. So far I have to say that this is most likely the way that I will be displaying data for audio projects from now on. Not only can I have a vertex for every sample for any given frame, I can also do all kinds of things with the camera, and position of the Object3d class based object as a way to adjust zoom level and so forth. Also when it comes to materials I can use vertex colors as a way to have a nice over all look for the state of the waveforms.
