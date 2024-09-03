import { BufferedGeometry } from '../BufferedGeometry.js';
import { Float32BufferedAttribute } from '../BufferedAttribute.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

export class DiskGeometry extends BufferedGeometry {

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

        for(let slice = 0; slice <= slices; slice++ ) {

            radius = innerRadius;
            
            for(let band=0; band <= bands; band++) {

                const p = new Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0);
                const n = new Vector3(0, 0, 1);

                // Add the vertex to the list
                vertices.push(p.x, p.y, p.z);

                // Add the normal to the list
                normals.push(n.x, n.y, n.z);

                // Compute uv-coordinates
                const uv = new Vector2( (p.x / outerRadius + 1)/2, (p.z / outerRadius + 1)/2 );

                // Add the uv-coordinates to the list
                uvs.push(uv);

                // Advance to the next band
                radius += deltaRadius;
            }

            // Advance to the next vertex
            angle += deltaAngle;
        }

        // Set up the indices
        for(let slice = 0; slice < slices; slice++ ) {
            
            const sliceBase = slice * (bands+1);

            for(let band=0; band < bands; band++) {

                const base = sliceBase + band;
                 
                const a = base;
                const b = base + 1;
                const c = base + 1 + bands + 1;
                const d = base + bands + 1;

                indices.push(a, b, c);
                indices.push(a, c, d);
            }
        }

        this.setIndices(indices);
        this.setAttribute('position', new Float32BufferedAttribute(vertices, 3, false));
        this.setAttribute('normal', new Float32BufferedAttribute(normals, 3, false));
        this.setAttribute('uv', new Float32BufferedAttribute(uvs, 2, false));
    }
};