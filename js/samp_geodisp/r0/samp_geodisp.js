/*
 *  samp_geodisp.js r0 - from videoground-samp-waveform
 *      * display state of sample data using Buffer Geometry
 */
 
(function(){

    const Samp_geodisp = {};
    
    Samp_geodisp.create_points = (samp_size = 1470, posY=0) => {
        const geometry = new THREE.BufferGeometry();
        let i = 0;
        const arr = [];
        while(i < samp_size){
            const a = i / samp_size;
            const x = -5 + 10 * a;
            const y = 0;
            const z = 0;
            arr.push(x, y, z);
            i += 1;
        }
        const vertices = new Float32Array(arr);
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        const material = new THREE.PointsMaterial({ size: 0.50});
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
