# bass_basic

First video of this collection, and also the aim here is to work out a basic bass waveform. Nothing fancy with this, in fact it might even just be a hacked over form of a simple sin wave even if that will work. I am thinking that the very basics of a decent bass waveform might just be that, but the one little detail beyond that would be that the amplitude of the bass should go up and down over the course of the duration of a note. For this waveform I am thinking that amplitude should also be adjusted by way of a sin wave as well it is just that this other sin wave should be tied to a note alpha value rather than any alpha value that has to do with a waveform cycle.

With that said I cam up with this:

```js
CS.WAVE_FORM_FUNCTIONS.bass_basic = (samp, a_wave) => {
    samp.amplitude = samp.amplitude === undefined ? 0.5: samp.amplitude;
    samp.frequency = samp.frequency === undefined ? 80: samp.frequency;
    samp.a_note = samp.a_note === undefined ? samp.a_wave : samp.a_note;
    const freq = samp.frequency;
    const a = Math.sin( Math.PI * freq * a_wave );
    const b = a * Math.sin( Math.PI * samp.a_note );
    const c = b * samp.amplitude;
    return c;
};
```
