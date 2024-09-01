import { BufferedGeometry } from '../BufferedGeometry.js';
import { Float32BufferedAttribute } from '../BufferedAttribute.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';

/**
 * Class representing a box centered at the origin
 */
export class BoxGeometry extends BufferedGeometry {
    /**
     * Creates an axis aligned Box, centred at the origin, given its size and number of segments along each direction
     * 
     * @param {*} sizex the size along the x-axis
     * @param {*} sizey the size along the y-axis
     * @param {*} sizez the size along the z-axis
     * @param {*} xsegments the number of segments along the x axis
     * @param {*} ysegments the number of segments along the y axis
     * @param {*} zsegments the number of segments along the z axis
     */
    constructor(sizex = 1, sizey = 1, sizez = 1, xsegments = 1, ysegments = 1, zsegments = 1) {
        super();

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        const scope = this;

        let vertexCount = 0;

        addFace('z', 'y', 'x', -1, +1, sizez, sizey, +sizex, zsegments, ysegments, 0);
        addFace('x', 'y', 'z', -1, +1, sizex, sizey, -sizez, xsegments, ysegments, 1);
        addFace('z', 'y', 'x', +1, +1, sizez, sizey, -sizex, zsegments, ysegments, 2);
        addFace('x', 'y', 'z', +1, +1, sizex, sizey, +sizez, xsegments, ysegments, 3);
        addFace('x', 'z', 'y', +1, -1, sizex, sizez, +sizey, xsegments, zsegments, 4);
        addFace('x', 'z', 'y', +1, +1, sizex, sizez, -sizey, xsegments, zsegments, 5);

        this.setIndices(indices);
        this.setAttribute('position', new Float32BufferedAttribute(vertices, 3, false));
        this.setAttribute('normal', new Float32BufferedAttribute(normals, 3, false));
        this.setAttribute('uv', new Float32BufferedAttribute(uvs, 2, false));


        /**
         * Adds a face of the box, possibly containing many small triangles
         * 
         * @param {*} u 
         * @param {*} v 
         * @param {*} w 
         * @param {*} udir 
         * @param {*} vdir 
         * @param {*} width 
         * @param {*} height 
         * @param {*} depth 
         * @param {*} usegments 
         * @param {*} vsegments 
         * @param {*} materialIndex 
         */
        function addFace(u, v, w, udir, vdir, width, height, depth, usegments, vsegments, materialIndex) {
            // Remembers the current vertex count since it is the base for this group 
            let groupBase = vertexCount;

            // Create a point, a normal and a uv-coordinate
            let p = new Vector3();
            let n = new Vector3();
            let uv = new Vector2();

            // Compute the halved dimensions
            let halfW = width / 2;
            let halfH = height / 2;
            let halfD = depth / 2;

            // Create the faces for this face using the number of segments given
            for (let i = 0, uvalue = 0; i <= usegments; i++, uvalue = i / usegments) {
                for (let j = 0, vvalue = 0; j <= vsegments; j++, vvalue = j / vsegments) {

                    // Compute the vertex coordinates
                    p[u] = -halfW * udir + i * udir * width / usegments;
                    p[v] = -halfH * vdir + j * vdir * height / vsegments;
                    p[w] = halfD;

                    // Add the vertex to the list
                    vertices.push(p.x, p.y, p.z);

                    // Compute the normal coordinates
                    n[u] = 0; n[v] = 0; n[w] = depth > 0 ? 1 : -1;

                    // Add the normal to the list
                    normals.push(n.x, n.y, n.z);

                    // Compute uv-coordinates
                    uv.s = uvalue; uv.t = vvalue;

                    // Add the uv-coordinates to the list
                    uvs.push(uv.s, uv.t);

                    let a = vertexCount, b = a + (vsegments + 1), c = b + 1, d = a + 1;

                    // Add the two triangular faces for this patch
                    if (i < usegments && j < vsegments) {
                        indices.push(a, c, d);
                        indices.push(a, b, c);
                    }

                    // Increase vertex counter
                    vertexCount++;
                }
            }

            // Register all the created vertices as belonging to a new group of faces and assign them the same material index
            scope.addGroup(groupBase, vertexCount - groupBase, materialIndex);
        }
    }
}




