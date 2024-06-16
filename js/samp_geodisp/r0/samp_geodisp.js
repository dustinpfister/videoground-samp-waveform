/*
 *  samp_geodisp.js r0 - from videoground-samp-waveform
 *      * display state of sample data using Buffer Geometry
 */
(function(){
    
    const create_line_geo = (opt) => {
        const geometry = new THREE.BufferGeometry();
        let i = 0;
        const vertices = [];
        const colors = [];
        while(i < opt.samp_size){
            const a = i / opt.samp_size;
            vertices.push(opt.x_delta * -1 + ( opt.x_delta * 2 ) * a, 0, 0);
            //Array.prototype.push.apply(colors, [1, a, 1 - a] );
            Array.prototype.push.apply(colors, opt.for_vertcolor(a, i, opt.samp_size, opt) );
            i += 1;
        }
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );        
        geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );
        return geometry;
    };
    
    const Samp_geodisp = {};
    
    const DEFAULTS_POINTS = {
        samp_size: 1470, y: 0, x_delta: 5, y_delta: 1, point_size: 1.00, linewidth: 3,
        for_vertcolor: (a, i, len, opt) => {
            const r = 1 - a;
            const g = 1;
            const b = a;
            return [r, g, b ];
        }
    };
    
    Samp_geodisp.create_points = (opt) => {
        opt = opt || {};
        opt = Object.assign({}, DEFAULTS_POINTS, opt);
        const geometry = create_line_geo(opt);
        // material
        const material = new THREE.PointsMaterial({ size: opt.point_size, vertexColors: true });
        // create, setup, and return the points object
        const points = new THREE.Points( geometry, material );
        points.position.set(0, opt.y, 0);
        points.userData = opt;
        return points;
    };
    
    Samp_geodisp.create_line = (opt) => {
        opt = opt || {};
        opt = Object.assign({}, DEFAULTS_POINTS, opt);
        const geometry = create_line_geo(opt);
        const material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: opt.linewidth });
        const line = new THREE.Line( geometry, material );
        line.position.set(0, opt.y, 0);
        line.userData = opt;
        return line;
    };
    
    Samp_geodisp.update_point = ( disp_points, index=0, samp=0 ) => {
        const geo = disp_points.geometry;
        const pos = geo.getAttribute('position');
        const pud = disp_points.userData;     
        const x_delta = pud.x_delta || 5;
        const y_delta = pud.y_delta || 1;
        pos.setXYZ(index, x_delta * -1 + ( x_delta * 2 ) * ( index / pos.count ), samp * y_delta, 0);
        pos.needsUpdate = true;
    };
    window.Samp_geodisp = Samp_geodisp;
}());
