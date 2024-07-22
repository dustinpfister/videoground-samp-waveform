# shorts_music_rolls_3track

This project aims to be a collection of YouTube shorts all of which are composed of three tracks, no more, no less. In some cases it might make sense to have less or more tracks, but for now at least that is something that I will do differently in other future projects. The main focus with this project is to make lots of youtube short videos in which each video is just a few measures long. While I am at it another major focus is to work on my music roll system, and what I have come to call 'player files'.

## Making ‘player files’

Like MIDI my music roll files do not contain any sounds, but rather data that can be used to generate sounds. Each time I create a new player file I can redefine the logic that is used to create audio sample data from music roll files. With that said these player files contain the pure functions that are used for each track.

## Using Buffer Geometry to display sample data

While working on the first draft of this project I started using THREE.BufferGeometry as a way to display the current state of what is going on in terms of audio sample data. So far I have to say that this is most likely the way that I will be displaying data for audio projects from now on. Not only can I have a vertex for every sample for any given frame, I can also do all kinds of things with the camera, and position of the Object3d class based object as a way to adjust zoom level and so forth. Also when it comes to materials I can use vertex colors as a way to have a nice over all look for the state of the waveforms.
