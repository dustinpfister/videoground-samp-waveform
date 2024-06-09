/*
 *  samp_geodisp.js r0 - from videoground-samp-waveform
 *      * display state of sample data using Buffer Geometry
 */
(function(){
    const Samp_geodisp = {};
    Samp_geodisp.create_points = (samp_size = 1470, posY=0) => {
        const geometry = new THREE.BufferGeometry();
        // set up position, and color attributes
        let i = 0;
        const vertices = [];
        const colors = [];
        while(i < samp_size){
            const a = i / samp_size;
            vertices.push(-5 + 10 * a, 0, 0);
            colors.push(1, a, 1 - a);
            i += 1;
        }
        geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );        
        geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );
        // material
        const material = new THREE.PointsMaterial({ size: 0.50, vertexColors: true });
        // create, setup, and return the points object
        const points = new THREE.Points( geometry, material );
        points.position.set(0, posY, 0);
        return points;
    };
    Samp_geodisp.update_point = (disp_points, index=0, samp=0, yMax=1) => {
        const geo = disp_points.geometry;
        const pos = geo.getAttribute('position');
        pos.setXYZ(index, -5 + 10 * ( index / pos.count ), samp * yMax, 0);
        pos.needsUpdate = true;
    };
    window.Samp_geodisp = Samp_geodisp;
}());
