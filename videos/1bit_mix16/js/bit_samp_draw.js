// samp-draw-bit - based on r0 of samp draw - from videoground-samp-waveform
(function(){
    const DSD = {};
    DSD.getsamp_lossy_random = (sample_array, i, index_step, c) => {
        const a = THREE.MathUtils.seededRandom(i);
        const i_delta = Math.floor(a * index_step);
        const samp = sample_array[i + i_delta];
        return samp;
    };
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

    const set_box_opt = (opt) => {
        opt.sx === undefined ? 0 : opt.sx;
        opt.sy === undefined ? 0 : opt.sy;
        opt.w === undefined ? 100 : opt.w;
        opt.h === undefined ? 25 : opt.h;
    };

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

    DSD.draw = (ctx, sample_array, opt = {}, alpha = 0, desc='') => {
        draw_midline(ctx, opt.sx, opt.sy, opt.w, opt.h);
        DSD.draw_sample_data(ctx, sample_array, opt );
        DSD.draw_box(ctx, opt, alpha );
        draw_desc(ctx, desc, opt);
    };

    DSD.draw_curve = (ctx, curve, alpha=0, desc='', opt={}) => {
        DSD.draw_box(ctx, opt, 0);
        set_box_opt(opt);
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'lime';
        ctx.beginPath();
        const len = opt.len === undefined ? 100: opt.len;
        let i = 0;
        while(i < len){
            //const v1 = curve.getPoint(i / ( len - 1 ));
            //const v2 = curve.getPoint(v1.x);
            const a = i / ( len - 1 );
            const v2 = ST.get_curve_v2ca(curve, a);
            const x = (opt.sx ) + (v2.x * opt.w);
            const y = (opt.sy + opt.h) - (v2.y * opt.h);
            if(i === 0){
                ctx.moveTo(x, y);
            }
            if(i > 0){
                ctx.lineTo(x, y);
            }
            i += 1;
        }
        ctx.stroke();
        //const v1 = curve.getPoint(alpha);
        //const v2 = curve.getPoint(v1.x);

        const v2 = ST.get_curve_v2ca(curve, alpha);

        const x = (opt.sx ) + (v2.x * opt.w),
        y = (opt.sy + opt.h) - (v2.y * opt.h);
        ctx.strokeStyle = '#7f7f7f';
        ctx.lineWidth = 3;
        ctx.fillStyle = '#efefef';
        ctx.beginPath();
        ctx.arc( x, y, 10, 0, Math.PI * 2 );
        ctx.fill();
        ctx.stroke();
        draw_desc(ctx, desc, opt);
    };

    DSD.draw_info = (ctx, sound, sm) => {
        const alpha = sm.frame / ( sm.frameMax - 1);
        ctx.fillStyle = 'lime';
        ctx.font = '25px courier';
        ctx.textBaseline = 'top';
        const disp_frame = sm.frame + '/' + sm.frameMax;
        const disp_time =  (sound.secs * alpha).toFixed(2) + ' / ' + sound.secs;
        ctx.fillText('frame: ' + disp_frame + ', seconds: ' + disp_time, 10, 10);
    };

    window.DSD = DSD;
}());
