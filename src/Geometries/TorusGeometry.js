import { BufferedGeometry } from '../BufferedGeometry.js';
import { Float32BufferedAttribute } from '../BufferedAttribute.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

/**
 * Class representing a sphere centered at the origin
 */

export class TorusGeometry extends BufferedGeometry {
    constructor(radius1 = 0.75, radius2 = 0.25, slices = 32, segments = 16, startAngle = 0, apertureAngle = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI) {
        super();

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        const dTheta = apertureAngle / slices;
        const dPhi = 2 * Math.PI / segments;


        // vertices will be layed in matrix
        // format:
        // slices lines x segments columns

        // Add vertices
        let theta = startAngle;
        for (let m = 0; m <= slices; m++) {
            let phi = 0;
            for (let p = 0; p <= segments; p++) {
                // Generate point on circle located on the z = 0 plane
                // translated along x by radius1
                let x = radius2 * Math.cos(phi) + radius1;
                let y = radius2 * Math.sin(phi);
                let z = 0;

                // Rotate point by theta around y axis
                const xx = Math.cos(theta) * x + Math.sin(theta) * z;
                const yy = y;
                const zz = -Math.sin(theta) * x + Math.cos(theta) * z;

                // Rotate center of circle on z=0 plane by same ammount
                const cx = radius1 * Math.cos(theta);
                const cy = 0;
                const cz = -radius1 * Math.sin(theta);

                // vertex data
                // position
                vertices.push(xx, yy, zz);
                // normal
                const n = new Vector3(xx - cx, yy - cy, zz - cz);
                n.normalize();

                normals.push(n.x, n.y, n.z);

                uvs.push(m / slices, p / segments);

                // move to next column of vertices
                phi += dPhi;
            }
            // move to the next line(s) of vertices, to the next slice
            theta += dTheta;
        }

        // Add the indices
        // Add mid section
        for (let m = 0; m < slices; m++) {
            for (let p = 0; p < segments; p++) {

                let base = m * (segments + 1) + p;
                let a = base;
                let b = base + 1;
                let c = base + 1 + segments + 1;
                let d = base + segments + 1;

                indices.push(a, b, c);
                indices.push(a, c, d);
            }
        }

        this.setIndices(indices);
        this.setAttribute('position', new Float32BufferedAttribute(vertices, 3, false));
        this.setAttribute('normal', new Float32BufferedAttribute(normals, 3, false));
        this.setAttribute('uv', new Float32BufferedAttribute(uvs, 2, false));
    }
}