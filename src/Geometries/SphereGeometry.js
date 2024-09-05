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
                uvs.push(0, 0); // TODO: fix uv coordinates

                // move to next column of vertices
                phi += dPhi;
            }
            // move to the next line(s) of vertices, moving away from the equator
            theta += dTheta;
        }

        // Add top of sphere
        vertices.push(0, 1, 0);
        normals.push(0, 1, 0);
        uvs.push(0.5, 1);

        // Add bottom of sphere
        vertices.push(0, -1, 0);
        normals.push(0, -1, 0);
        uvs.push(0.5, 0);

        console.log(vertices.length);

        // Add the indices
        for (let m = 0; m < vSegments; m++) {
            for (let p = 0; p < 2 * hSegments - 2; p++) {

                let base = m * (2 * hSegments - 1) + p;
                let a = base;
                let b = base + 1;
                let c = base + 1 + 2 * hSegments - 1;
                let d = base + 2 * hSegments - 1;

                indices.push(a, b, c);
                indices.push(a, c, d);

                //console.log(a, b, c);
                //console.log(a, c, d);
            }
        }


        // Add mid section

        // Add top cap

        // Add bottom cap

        this.setIndices(indices);
        this.setAttribute('position', new Float32BufferedAttribute(vertices, 3, false));
        this.setAttribute('normal', new Float32BufferedAttribute(normals, 3, false));
        this.setAttribute('uv', new Float32BufferedAttribute(uvs, 2, false));
    }
}