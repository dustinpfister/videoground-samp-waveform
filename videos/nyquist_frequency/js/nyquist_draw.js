/*
 *  nyquist_draw.js - from nyquist_frequency project in videoground-samp-waveform
 */
 
(function(){

    const Nyquist_draw = {};
    
    Nyquist_draw.background = (ctx, canvas) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, canvas.width, canvas.height);
    };
    
    Nyquist_draw.info = (ctx, sud, sm) => {
    
        // text info - freq and samp per sec
        const text_info = '' + 
            ' frequency: ' + sud.frequency.toFixed(2).padStart(3 + 5, 0) +
            ' samples_per_cycle: ' + sud.samples_per_cycle.toFixed(4)       
        ctx.fillStyle = 'white';
        ctx.font = '30px  courier';
        ctx.textBaseline = 'top';
        ctx.fillText(text_info,10,10);

        // text info - freq and samp per sec
        const text_info2 = '' +
            ' frame: ' + String(sm.frame).padStart(String(sm.frameMax).length, '0') + '/' + sm.frameMax;
        ctx.fillText(text_info2, 10, 40);
    };
    
    // draw the data samples
    Nyquist_draw.samples = (ctx, data_samples) => {
        const cols = 10;
        const y_start = 120, y_delta = 60, y_div = 2.1;
        const x_start = 10, x_delta = 8.6;
        const len = data_samples.length;
        const i_delta = len / cols;
        let i_slice = 0;
        while(i_slice < cols){
            const i_start = i_delta * i_slice;
            const i_end = i_start + i_delta;
            const slice = data_samples.slice(i_start, i_end);
            const my = y_start + y_delta * i_slice;
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#00ffaa';
            ctx.beginPath();
            ctx.moveTo(x_start, my);
            ctx.lineTo(slice.length * x_delta, my);
            ctx.stroke();
            slice.forEach( (sample, i) => {
                const n = ST.mode_to_raw(sample, 'int16');
                const x = x_start + (i * x_delta);
                const ey = my + ( y_delta / y_div ) * n;
                ctx.lineWidth = 5;
                ctx.strokeStyle = '#00ca00';
                ctx.beginPath();
                ctx.moveTo(x, my);
                ctx.lineTo(x, ey);
                ctx.closePath();
                ctx.stroke();   
            });
            i_slice += 1;
        }
    };
    
    window.Nyquist_draw = Nyquist_draw;

}());
