import { BufferedGeometry } from '../BufferedGeometry.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

class DiskGeometry extends BufferedGeometry {

    constructor(innerRadius = 0.5, outerRadius = 1.0, slices = 32, bands = 1, startAngle = 0, apertureAngle = 2 * Math.PI)
    {
        super();

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        const deltaAngle = apertureAngle / slices;
        const deltaRadius = ( outerRadius - innerRadius ) / bands;

        let angle = startAngle;
        let radius = innerRadius;

        for(let s = 0; s <= slices; s++ ) {

            radius = innerRadius;
            
            for(let b=0; b <= bands; b++) {

                const p = new Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0);
                const n = new Vector3(0, 0, 1);

                // Add the vertex to the list
                vertices.push(p.x, p.y, p.z);

                // Add the normal to the list
                normals.push(n.x, n.y, n.z);

                // Compute uv-coordinates
                const uv = new Vector2( (p.x / outerRadius + 1)/2, (p.z / outerRadius + 1)/2);

                // Add the uv-coordinates to the list
                uvs.push(uv);

                // Advance to the next band
                radius += deltaRadius;
            }

            // Advance to the next vertex
            angle += deltaAngle;
        }
    }
};