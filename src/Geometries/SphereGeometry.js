import { BufferedGeometry } from '../BufferedAttribute.js';
import { Float32BufferedAttribute } from '../BufferedAttribute.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

/**
 * Class representing a sphere centered at the origin
 */

export class SphereGeometry extends BufferedGeometry {
    constructor( radius = 1, meridians = 32, parallels = 16, startAngle = 0, apertureAngle = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI )
    {
        super();

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        const deltaAngle = apertureAngle / meridians;
        const deltaParallels = Math.PI / (2 * parallels);

        // Add top of sphere
        vertices.push(0, 1, 0);
        normals.push(0, 1, 0);
        uvs.push(0.5, 1);

        // Add top cap

        // Add top part


        // Add bottom of sphere
        vertices.push(0, -1, 0);
        normals.push(0, -1, 0);
        uvs.push(0.5, 0);

        // Add bottom cap

        // Add bottom part

        // Add the indices


        this.setIndices(indices);
        this.setAttribute('position', new Float32BufferedAttribute(vertices, 3, false));
        this.setAttribute('normal', new Float32BufferedAttribute(normals, 3, false));
        this.setAttribute('uv', new Float32BufferedAttribute(uvs, 2, false));
    }
}