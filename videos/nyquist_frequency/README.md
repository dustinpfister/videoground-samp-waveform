# nyquist_frequency

In order to have at least one waveform cycle I need to have at least two samples to do so. This then means that there is a limit for pitch that is about half of whatever the sample rate is. There is a term for this which is nyquist\_frequency or folding frequency. For example at a sampling rate of 44100 samples/second, at 0.5 cycle/sample, the corresponding Nyquist frequency is 22050 cycles/second (Hz).

The aim here then is to create some video files in which I explore this topic more. While doing so I can also have a new display for the content that will show what the current deal is on a sample, by sample basis. What I mean by that is having a way to display how many samples per waveform cycle there are given the current pitch.


