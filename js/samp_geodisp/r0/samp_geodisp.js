/*
 *  samp_geodisp.js r0 - from videoground-samp-waveform
 *      * display state of sample data using Buffer Geometry
 */
(function(){
    const Samp_geodisp = {};
    Samp_geodisp.create_points = (opt) => {
    
        const DEFAULTS = { samp_size: 1470, y: 0, x_delta: 5, point_size: 1.00 }
    
        opt = opt || {};
        opt = Object.assign({}, DEFAULTS, opt);
    
        const geometry = new THREE.BufferGeometry();
        // set up position, and color attributes
        let i = 0;
        const vertices = [];
        const colors = [];
        while(i < opt.samp_size){
            const a = i / opt.samp_size;
            vertices.push(opt.x_delta * -1 + ( opt.x_delta * 2 ) * a, 0, 0);
            colors.push(1, a, 1 - a);
            i += 1;
        }
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );        
        geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );
        // material
        const material = new THREE.PointsMaterial({ size: opt.point_size, vertexColors: true });
        // create, setup, and return the points object
        const points = new THREE.Points( geometry, material );
        points.position.set(0, opt.y, 0);
        points.userData = opt;
        return points;
    };
    Samp_geodisp.update_point = (disp_points, index=0, samp=0, yMax=1) => {
        const geo = disp_points.geometry;
        const pos = geo.getAttribute('position');
        const pud = disp_points.userData;
        
        const x_delta = pud.x_delta || 5;
        
        pos.setXYZ(index, x_delta * -1 + ( x_delta * 2 ) * ( index / pos.count ), samp * yMax, 0);
        pos.needsUpdate = true;
    };
    window.Samp_geodisp = Samp_geodisp;
}());
