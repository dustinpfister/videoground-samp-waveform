# vector3_start

This is the starting project folder for what might become a few projects that have to do with using a Vector3 object for setting audio sample data values. For this project at least there is starting out with just one point in 3d space, rather than a few, or a whole geometry. It is not fully clear to me how to go about doing this sort of this thus far but I would like to at least get started with it.

## Vector Unit Length used to set amplitude, direction for pitch, and other waveform paramaters

There are all kinds of ideas that come to mind with this of course, however I am thinking that the vector unit length should be used to set what the amplitude should be. After that there is the question of what to do with the direction of the vector. There is of course setting the pitch of the waveform that is used which can maybe be tied to the y value, that then leaves x and z free for setting two other paramaters of some kind. Two other paramaters might be somehting like setting the total number of possible sample depth index values, and maybe a lerp value from one waveform type to another such as sine to triangle maybe.

So then:

* length = amplitude
* y = pitch
* x = sample depth
* z = sine to triangle lerp



