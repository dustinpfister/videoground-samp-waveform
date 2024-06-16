# samp_geodisp todo list

## ( done 06/16/2024 ) - R0 - create and update points
    * (done) have a method to create points with a given size \( such as 1470 for each sample of a frame at 44.1 kHz sample rate \)
    * (done) have a method to update a single point at a time with a given sample index and value in -1 to 1 format for sample depth
    * (done) see about adding a vertex colors attribute for points
    * (done) I might want to use an options object for create points
    * (done) the update points method should use options stored in the userData object of the points or lines
    * (done) common defaults object for points and lines
    * (done) I want a way to set the style of the points or lines
