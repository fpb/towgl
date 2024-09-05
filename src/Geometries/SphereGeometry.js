import { BufferedGeometry } from '../BufferedGeometry.js';
import { Float32BufferedAttribute } from '../BufferedAttribute.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

/**
 * Class representing a sphere centered at the origin
 */

export class SphereGeometry extends BufferedGeometry {
    constructor(radius = 1, vSegments = 32, hSegments = 16, startAngle = 0, apertureAngle = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI) {
        super();

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        const dTheta = apertureAngle / vSegments;
        const dPhi = Math.PI / (2 * hSegments);


        // Mid vertices (except top and bottom vertices) will be layed in matrix
        // format, from bottom to top first and around next
        // (2 hSegments - 1) lines x (vSegments + 1) columns

        // Add mid vertices
        let theta = startAngle;
        for (let m = 0; m <= vSegments; m++) {
            let phi = -Math.PI / 2 + dPhi;
            for (let p = 1; p < 2 * hSegments; p++) {
                let x = Math.cos(theta) * Math.cos(phi);
                let z = Math.sin(theta) * Math.cos(phi);
                let y = Math.sin(phi);

                // vertex data
                vertices.push(radius * x, radius * y, radius * z);
                normals.push(x, y, z);
                uvs.push(m / vSegments, p / (2 * hSegments + 1));

                // move to next column of vertices
                phi += dPhi;
            }
            // move to the next line(s) of vertices, moving away from the equator
            theta += dTheta;
        }

        // Add top of sphere
        let top = vertices.length / 3;
        vertices.push(0, 1, 0);
        normals.push(0, 1, 0);
        uvs.push(0.5, 1);

        console.log("top=" + top);

        let bottom = vertices.length / 3;
        // Add bottom of sphere
        vertices.push(0, -1, 0);
        normals.push(0, -1, 0);
        uvs.push(0.5, 0);

        console.log("bottom=" + bottom);

        console.log(vertices.length / 3);

        // Add the indices
        // Add mid section
        for (let m = 0; m < vSegments; m++) {
            for (let p = 0; p < 2 * hSegments - 2; p++) {

                let base = m * (2 * hSegments - 1) + p;
                let a = base;
                let b = base + 1;
                let c = base + 1 + 2 * hSegments - 1;
                let d = base + 2 * hSegments - 1;

                indices.push(a, b, c);
                indices.push(a, c, d);
            }
        }

        // Add top cap
        for (let m = 0; m < vSegments; m++) {
            const a = (m + 1) * (2 * hSegments - 1) - 1;
            const b = (m + 2) * (2 * hSegments - 1) - 1;
            indices.push(top, b, a);
        }
        // Add bottom cap
        for (let m = 0; m < vSegments; m++) {
            const a = m * (2 * hSegments - 1);
            const b = (m + 1) * (2 * hSegments - 1);
            indices.push(bottom, a, b);
        }

        this.setIndices(indices);
        this.setAttribute('position', new Float32BufferedAttribute(vertices, 3, false));
        this.setAttribute('normal', new Float32BufferedAttribute(normals, 3, false));
        this.setAttribute('uv', new Float32BufferedAttribute(uvs, 2, false));
    }
}