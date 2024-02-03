# vector3_start

This is the starting project folder for what might become a few projects that have to do with using a Vector3 object for setting audio sample data values. For this project at least there is starting out with just one point in 3d space, then maybe also a few more as that is one of many things I want to experiment with more before starting a another project folder like this. It is not fully clear to me how to go about doing this sort of this thus far but I would like to at least get started with it and learn as I go.

## 1 - Starting out with Vector3 sound samples

### 1.1 - Vector Unit Length used to set amplitude, direction for pitch, and other waveform parameters

There are all kinds of ideas that come to mind with this of course, however I am thinking that the vector unit length should be used to set what the amplitude should be. After that there is the question of what to do with the direction of the vector. There is of course setting the pitch of the waveform that is used which can maybe be tied to the y value, that then leaves x and z free for setting two other parameters of some kind. Two other parameters might be something like setting the total number of possible sample depth index values, and maybe a lerp value from one waveform type to another such as sine to triangle maybe.

So then:

* length = amplitude
* y = pitch
* x = sample depth
* z = sine to triangle lerp

Some other variations of this can be done that will changed things up a little from one waveform to another. I might want to stick to setting amplitude to unit length, and pitch to the y axis of the direction, but x and z are kind of while cards here. If I am using a waveform that has two exclusive parameters I might want to use x and z to change those.

<div align="center">
    <a href="https://www.youtube.com/watch?v=cD-kBKsCI-c">
        <img src="https://img.youtube.com/vi/cD-kBKsCI-c/0.jpg" style="width:50%;">
    </a><br>
    <p>
        video01-01-start that is a proof of concept for this.
    </p>
</div>




### 1.2 - Just get started with tables and mixing

I am sure there is a lot to be done with just a single vector3 object, but I will of course want to work out at least one if not many more videos that involve an array of vector3 objects. For now I will not get to much in depth with this as I think it will be best to have a whole other project folder for this one, but there is still starting out with this to say the least. This allows for some interesting things that might help a whole lot and to free up things when it comes to the four values I have to work with for each vector. 

So of course first and foremost I will just want to get started with mixing here. With that said I can just create a group of mesh objects and use the position property of each of these mesh objects as the vector3 object to use for this. In place of directly using the seededsaw waveform that I used for the first video I can use a table waveform and then use seeded saw for each mesh object in the table array.

<!-- video01-02-start-mix -->

### 1.3 - Fixed table of pitch range values, y dir value used to set amplidue values for them

Another idea I would like to try is to have a set number of waveforms for a table, and then use the y values of Vector3 objects to find out what waveforms the vectors amplitude in terms of unit length as usual will apply to. This will then preserve the use of the y direction for pitch, and then also unit length for amplitude as well.

<!-- video01-03-start-range -->

## 2 - Sequences, and tunes?

Although I might be on to something interesting here that might only be the case for people that are interested in programing, sound engineering, and so forth. If I do start to make a lot of project folders branching off from this I will want to have a way to break a video down into many sequences each of which might use differing logic to update the values of the vector3 objects used, and also how to use the state of these objects to render the audio sample data. It is then called for to work out at least a few videos that explore this topic a bit.
## 2.1 - Just use the usual sequence hooks module

To start out with this I think I should just use the typical module that I all ready have in place for breaking a video up into many sequences. The goal here is to use one or more vector3 objects to produce something that sounds like some kind of tune, or song. 

## 3 - A bit More on tables and mixing Maybe?

This is still very much a start project folder on this topic, but I might still want to work out a few more videos on tables and mixing here. That is I might want to, maybe it would be best to pull this into a whole other project folder. In any case I will draft some notes for ideas on this topic that I might get to here or elsewhere.

### 3.x - Use Vector Index value to set pitch

One interesting thing I might do do with this is to use the vector3 index value as a way to represent pitch, freeing up the y value of each vector3 object for some other value. What I mean bu this is that I can have vector0 represent say c2 in terms of pitch, then vector1 represent c#2, and so forth. It is then just a matter of setting all vectors to a unit length of 0 that are not currently being used. The length from the origin will then increase amplitude for each pitch vector that is moved from the origin just as before with the first few videos here. However now all three direction values are free to be used to set all kinds of other interesting waveform parameter values.





