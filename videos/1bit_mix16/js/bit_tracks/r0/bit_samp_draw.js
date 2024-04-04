/* bit_samp_draw.js - based on r0 of samp_draw.js - from videoground-samp-waveform
 * github.com/dustinpfister/videoground-samp-waveform/blob/master/videos/1bit_mix16/
 */ 
(function(){
    const DSD = {};
    /********* **********
    INTERNAL HELPER FUNCTIONS
    ********** *********/
    // draw a midline
    const draw_midline = (ctx, sx, sy, w, h) => {
        // mid line
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        const y = sy + h / 2;
        ctx.beginPath();
        ctx.moveTo(sx, y);
        ctx.lineTo(sx + w, y);
        ctx.stroke();
    };
    // box option helper
    const set_box_opt = (opt) => {
        opt.sx === undefined ? 0 : opt.sx;
        opt.sy === undefined ? 0 : opt.sy;
        opt.w === undefined ? 100 : opt.w;
        opt.h === undefined ? 25 : opt.h;
    };
    // draw description
    const draw_desc = (ctx, desc, opt) => {
        const overlay_alpha = opt.overlay_alpha === undefined ? 0.3 : opt.overlay_alpha; 
        ctx.fillStyle = 'rgba(0,0,0,' + overlay_alpha + ')';
        ctx.fillRect(opt.sx,opt.sy,opt.w, opt.h);
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = opt.font || '25px courier';
        ctx.fillStyle = opt.fill || '#ffffff';
        let padx = opt.padx === undefined ? 10: opt.padx;
        let pady = opt.pady === undefined ? 10: opt.pady;
        ctx.fillText(desc, opt.sx + padx, opt.sy + pady);
    };
    /********* **********
    GET SAMPLE FUNCTIONS - used for drawing sample data representations
    ********** *********/
    // a get sample function where random samples are selected for representation of a range of audio
    DSD.getsamp_lossy_random = (sample_array, i, index_step, c) => {
        const a = THREE.MathUtils.seededRandom(i);
        const i_delta = Math.floor(a * index_step);
        const samp = sample_array[i + i_delta];
        return samp;
    };
    // a get sample function where the highest and lowest samples are used
    DSD.getsamp_lossy_pingpong = ( sample_array, i, index_step, c ) => {
        const high = c % 2 === 0;
        const frame_samps = sample_array.slice( i, i + index_step );
        const a = Math.max.apply(null, frame_samps);
        const b = Math.min.apply(null, frame_samps);
        let samp = b;
        if(high){
            samp = a;
        }
        return samp;
    };
    
    
    DSD.create_disp_options = (tracks, sound, opt={} ) => {  
        opt = Object.assign({}, {
            width: 1200,
            height: 640,
            sx: 40,
            sy: 80,
            text_space:70,
            text_pad:35,
            line_width: 12,
            overlay_alpha: 0,
            track_styles: ['#ffffff', '#444444'],
            mix_styles: ['#ff0000', '#880000'],
        }, opt); 
        const track_disp_opt = {
            tracks: [],
            mix: {}
        };
        const h = Math.floor( (opt.height - opt.text_space * ( tracks.count + 1 ) ) / ( tracks.count + 1) );
        let i_track = 0;
        while(i_track < tracks.count){
            track_disp_opt.tracks[i_track] = {
                w: opt.width, h: h, 
                sx: opt.sx, sy: opt.sy + h * i_track + opt.text_space * i_track,  
                padx: 0, pady: opt.text_pad * -1, mode: 'raw', overlay_alpha: opt.overlay_alpha,
                lineWidth: opt.line_width, boxLineWidth: opt.line_width,
                boxStyle: opt.track_styles[1], lineStyle: opt.track_styles[0]
            };       
            i_track += 1;
        }  
        track_disp_opt.mix = {
            w: opt.width, h: h,
            sx: opt.sx, sy: opt.sy + h * tracks.count + opt.text_space * tracks.count, 
            padx: 0, pady: opt.text_pad * -1, mode: sound.mode, overlay_alpha: opt.overlay_alpha, 
            lineWidth: opt.line_width, boxLineWidth: opt.line_width, boxStyle: opt.mix_styles[1], lineStyle: opt.mix_styles[0]
        };      
        return track_disp_opt;  
    };
    
    /********* **********
    PUBLIC DRAW METHODS
    ********** *********/
    // main draw sample function
    DSD.draw_sample_data = (ctx, sample_array, opt = {} ) => {
        const sx = opt.sx === undefined ? 0 : opt.sx;
        const sy = opt.sy === undefined ? 0 : opt.sy;
        const w = opt.w === undefined ? 100 : opt.w;
        const h = opt.h === undefined ? 25 : opt.h;
        const getsamp_lossy = opt.getsamp_lossy || function(sample_array, i ){ return sample_array[i]; };
        const mode = opt.mode || 'raw';
        const sample_count = sample_array.length;
        const disp_hh = h / 2;
        let index_step = 1;
        if( sample_count >= w ){
            index_step = Math.floor( sample_count / w );
        }
        ctx.strokeStyle = opt.lineStyle || 'lime';
        ctx.lineWidth = opt.lineWidth || 8;
        ctx.beginPath();
        let i = 0, c = 0;
        while(i < sample_count){
            const x = sx + w * ( i / (sample_count - 1) );
            let samp = 0;
            if( index_step === 1 ){
               samp = sample_array[ i ];
            }
            if(index_step > 1){
               samp = getsamp_lossy(sample_array, i, index_step, c);
            }
            samp = ST.mode_to_raw(samp, mode);
            const y = sy + disp_hh + samp * disp_hh * -1;
            if(i === 0){
                ctx.moveTo(x, y);
            }
            if(i > 0){
                ctx.lineTo(x, y);
            }
            i += index_step;
            c += 1;
        }
        ctx.stroke();
    };

    DSD.draw_box = (ctx, opt, alpha=0 ) => {
        set_box_opt(opt);
        ctx.strokeStyle = opt.boxStyle ||'lime';
        ctx.lineWidth = opt.boxLineWidth || 6;
        ctx.strokeRect(opt.sx, opt.sy, opt.w, opt.h);
        if(alpha){
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.fillRect(opt.sx, opt.sy, opt.w * alpha, opt.h);
        }
    };

    DSD.draw_info = (ctx, sound, sm, fill='white', size=25) => {
        const alpha = sm.frame / ( sm.frameMax - 1);
        ctx.fillStyle = fill;
        ctx.font = size + 'px courier';
        ctx.textBaseline = 'top';
        const disp_frame = sm.frame + '/' + sm.frameMax;
        const disp_time =  (sound.secs * alpha).toFixed(2) + ' / ' + sound.secs;
        ctx.fillText('frame: ' + disp_frame + ', seconds: ' + disp_time, 10, 10);
    };
    
    
    DSD.draw_tracks = (ctx, tracks, track_disp_opt) => {
        let i_track = 0;
        const len_track = tracks.samples.length;
        while(i_track < len_track ){
            const desc = tracks.desc[i_track] || 'track ' + i_track;
            DSD.draw( ctx, tracks.samples[i_track], track_disp_opt.tracks[i_track], 0, desc );
            i_track += 1;
        }
    };
    
    // updated main draw function that will draw a given sample array
    DSD.draw = (ctx, sample_array, opt = {}, alpha = 0, desc='') => {
        draw_midline(ctx, opt.sx, opt.sy, opt.w, opt.h);
        DSD.draw_box(ctx, opt, alpha );
        DSD.draw_sample_data(ctx, sample_array, opt );
        draw_desc(ctx, desc, opt);
    };

    window.DSD = DSD;
}());
