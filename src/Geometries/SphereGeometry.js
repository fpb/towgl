import { BufferedGeometry } from '../BufferedAttribute.js';
import { Float32BufferedAttribute } from '../BufferedAttribute.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

/**
 * Class representing a sphere centered at the origin
 */

export class SphereGeometry extends BufferedGeometry {
    constructor() {
        super();

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        this.setIndices(indices);
        this.setAttribute('position', new Float32BufferedAttribute(vertices, 3, false));
        this.setAttribute('normal', new Float32BufferedAttribute(normals, 3, false));
        this.setAttribute('uv', new Float32BufferedAttribute(uvs, 2, false));
    }
}