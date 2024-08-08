/** 
 * @module Matrix4
 * */
import { Vector4 } from './Vector4.js';
import { Matrix3 } from './Matrix3.js';

export class Matrix4 {
    
    #m;

    /** Represents a 4x4 matrix of real values.
     * @constructor
     * @param {Matrix4 | Array} m - another Matrix4 object to clone, an array of 4x4 real numbers or an array of 16 real numbers.
     */
    constructor(m) 
    {
        this.#m = [ [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]];

        if(Array.isArray(m)) {
            if(Array.isArray(m[0])) {
                if(m.length == 4 && m[0].length == 4) {
                    // The passed array is a 4x4 matrix
                    for(let i=0; i<4; i++)
                        for(let j=0; j<4; j++)
                            this.#m[i][j] = m[i][j];
                }
                else throw new Error("Matrix4: bidimensional array with wrong dimensions");
            }
            else {
                if(m.length == 16) {
                    // A unidimensional array is also fine, as long as it has 16 entries.
                    let k=0;
                    for(let i=0; i<4; i++) {
                        for(let j=0; j<4; j++) {
                            this.#m[i][j] = m[k++]; // Entries are filled in row major order
                        }
                    }
                }
                else throw new Error("Matrix4: unidimensional array with wrong size. Sixteen elements required!");
            }
        } else {
            if(m instanceof Matrix4) {
                for(let i=0; i<4; i++) {
                    for(let j=0; j<4; j++) {
                        this.#m[i][j] = m.m[i][j];
                    }
                }
            }
            else if(!!m) {
                throw new Error("Matrix4: passed object not compatible: " + typeof m);
            }
        }
    }
    
    static dot(m1, m2, l1, c2) {
        let sum = 0;
        for(let i=0; i<4; i++) {
            sum += m1.#m[l1][i] * m2.#m[i][c2];
        }
        return sum;
    }

    static mult(m1, m2) {
        if(m2 instanceof Vector4) {
            let v = [];
            for(let i=0; i<4; i++) {
                let sum = 0;
                for(let j=0; j<4; j++) {
                    sum += m1.#m[i][j] + m2.v[j];
                }
                v.push(sum);
            }
            return new Vector4(v);
        }
        else {
            let temp = [];
            for(let i=0; i<4; i++) {
                for(let j=0; j<4; j++) {
                    temp.push(Matrix4.dot(m1, m2, i, j));
                }
            }
            return new Matrix4(temp);
        }
    }

    static add(m1, m2) {
        let m = new Matrix4([ m1.m[0][0] + m2.m[0][0], m1.m[0][1] + m2.m[0][1], m1.m[0][2] + m2.m[0][2], m1.m[0][3] + m2.m[0][3],
                           m1.m[1][0] + m2.m[1][0], m1.m[1][1] + m2.m[1][1], m1.m[1][2] + m2.m[1][2], m1.m[1][3] + m2.m[1][3],
                           m1.m[2][0] + m2.m[2][0], m1.m[2][1] + m2.m[2][1], m1.m[2][2] + m2.m[2][2], m1.m[2][3] + m2.m[2][3],
                           m1.m[3][0] + m2.m[3][0], m1.m[3][1] + m2.m[3][1], m1.m[3][2] + m2.m[3][2], m1.m[3][3] + m2.m[3][3] ]);
        return m;
    }

    static sub(m1, m2) {
        let m = new Matrix4([ m1.m[0][0] - m2.m[0][0], m1.m[0][1] - m2.m[0][1], m1.m[0][2] - m2.m[0][2], m1.m[0][3] - m2.m[0][3],
                           m1.m[1][0] - m2.m[1][0], m1.m[1][1] - m2.m[1][1], m1.m[1][2] - m2.m[1][2], m1.m[1][3] - m2.m[1][3],
                           m1.m[2][0] - m2.m[2][0], m1.m[2][1] - m2.m[2][1], m1.m[2][2] - m2.m[2][2], m1.m[2][3] - m2.m[2][3],
                           m1.m[3][0] - m2.m[3][0], m1.m[3][1] - m2.m[3][1], m1.m[3][2] - m2.m[3][2], m1.m[3][3] - m2.m[3][3] ]);
        return m;
    }

    /** 
     * Represents a 4x4 3D scaling matrix in homogeneous coordinates
     * @param {number | Array} s1 - either the x scaling or a vector containing the 3 scaling factors
     * @param {number} s2 - the y scaling factor
     * @param {number} s3 - the z scaling factor
     */
    static scale(s1, s2, s3) {
        let m = new Matrix4();
        if(Array.isArray(s1)) {
            m.m[0][0] = s1[0]; m.m[1][1] = s1[1]; m.m[2][2] = s1[2]; m.m[3][3] = 1;
        }
        else {
            m.m[0][0] = s1; m.m[1][1] = s2; m.m[2][2] = s3; m.m[3][3] = 1;
        }
        return m;
    }

    /** 
     * Represents a 4x4 3D translation matrix with homogeneous coordinates 
     * @param {number | Array} t1 - either the x component for the translation vector or an array containing the 4 components of the translation vector
     * @param {number} t2 - the y component of the translation vector
     * @param {number} t3 - the z component of the translation vector
    */
    static translation(t1, t2, t3) {
        let m = new Matrix4();
        if(Array.isArray(t1)) {
            m.m[0][3] = t1[0];
            m.m[1][3] = t1[1];
            m.m[2][3] = t1[2];
        } else {
            m.m[0][3] = t1;
            m.m[1][3] = t2;
            m.m[2][3] = t3;
        }
        return m;
    }

    /**
     * Represents a 4x4 3D rotation matrix around the X axis
     * @param {number} angle - the rotatin angle in degrees
     */
    static rotationX(angle) {
        let c = Math.cos(angle * Math.PI / 180.0);
        let s = Math.sin(angle * Math.PI / 180.0);
        let m = [ [ 1,  0,  0,  0],
                  [ 0,  c, -s,  0],
                  [ 0,  s,  c,  0],
                  [ 0,  0,  0,  1] ];
        return new Matrix4(m);
    }

    /**
     * Represents a 4x4 3D rotation matrix around the Y axis
     * @param {number} angle - the rotatin angle in degrees
     */
    static rotationY(angle) {
        let c = Math.cos(angle * Math.PI / 180.0);
        let s = Math.sin(angle * Math.PI / 180.0);
        let m = [ [ c,  0,  s,  0],
                  [ 0,  1,  0,  0],
                  [-s,  0,  c,  0],
                  [ 0,  0,  0,  1] ];
        return new Matrix4(m);
    }

    /**
     * Represents a 4x4 3D rotation matrix around the Z axis
     * @param {number} angle - the rotatin angle in degrees
     */
    static rotationZ(angle) {
        let c = Math.cos(angle * Math.PI / 180.0);
        let s = Math.sin(angle * Math.PI / 180.0);
        let m = [ [ c, -s,  0,  0],
                  [ s,  c,  0,  0],
                  [ 0,  0,  1,  0],
                  [ 0,  0,  0,  1] ];
        return new Matrix4(m);
    }

    get diag () {
        return [this.#m[0][0], this.#m[1][1], this.#m[2][2], this.#m[3][3]];
    }

    get m () {
        return this.#m;
    }

    get inverse () {
        const d = this.determinant;

        const a00 = new Matrix3( [
            [this.#m[1][1], this.#m[1][2], this.#m[1][3]],
            [this.#m[2][1], this.#m[2][2], this.#m[2][3]],
            [this.#m[3][1], this.#m[3][2], this.#m[3][3]]
        ]);

        const a01 = new Matrix3([
            [this.#m[1][0], this.#m[1][2], this.#m[1][3]],
            [this.#m[2][0], this.#m[2][2], this.#m[2][3]],
            [this.#m[3][0], this.#m[3][2], this.#m[3][3]]
        ]) ;

        const a02 = new Matrix3([
            [this.#m[1][0], this.#m[1][1], this.#m[1][3]],
            [this.#m[2][0], this.#m[2][1], this.#m[2][3]],
            [this.#m[3][0], this.#m[3][1], this.#m[3][3]]
        ]);

        const a03 = new Matrix3([
            [this.#m[1][0], this.#m[1][1], this.#m[1][2]],
            [this.#m[2][0], this.#m[2][1], this.#m[2][2]],
            [this.#m[3][0], this.#m[3][1], this.#m[3][2]]
        ]);

        const a10 = new Matrix3([
            [this.#m[0][1], this.#m[0][2], this.#m[0][3]],
            [this.#m[2][1], this.#m[2][2], this.#m[2][3]],
            [this.#m[3][1], this.#m[3][2], this.#m[3][3]]
        ]);

        const a11 = new Matrix3([
            [this.#m[0][0], this.#m[0][2], this.#m[0][3]],
            [this.#m[2][0], this.#m[2][2], this.#m[2][3]],
            [this.#m[3][0], this.#m[3][2], this.#m[3][3]]
        ]);

        const a12 = new Matrix3([
            [this.#m[0][0], this.#m[0][1], this.#m[0][3]],
            [this.#m[2][0], this.#m[2][1], this.#m[2][3]],
            [this.#m[3][0], this.#m[3][1], this.#m[3][3]]
        ]);

        const a13 = new Matrix3([
            [this.#m[0][0], this.#m[0][1], this.#m[0][2]],
            [this.#m[2][0], this.#m[2][1], this.#m[2][2]],
            [this.#m[3][0], this.#m[3][1], this.#m[3][2]]
        ]);

        const a20 = new Matrix3([
            [this.#m[0][1], this.#m[0][2], this.#m[0][3]],
            [this.#m[1][1], this.#m[1][2], this.#m[1][3]],
            [this.#m[3][1], this.#m[3][2], this.#m[3][3]]
         ]);

         const a21 = new Matrix3([
            [this.#m[0][0], this.#m[0][2], this.#m[0][3]],
            [this.#m[1][0], this.#m[1][2], this.#m[1][3]],
            [this.#m[3][0], this.#m[3][2], this.#m[3][3]]
         ]);

         const a22 = new Matrix3([
            [this.#m[0][0], this.#m[0][1], this.#m[0][3]],
            [this.#m[1][0], this.#m[1][1], this.#m[1][3]],
            [this.#m[3][0], this.#m[3][1], this.#m[3][3]]
         ]);

         const a23 = new Matrix3([
            [this.#m[0][0], this.#m[0][1], this.#m[0][2]],
            [this.#m[1][0], this.#m[1][1], this.#m[1][2]],
            [this.#m[3][0], this.#m[3][1], this.#m[3][2]]
         ]);
     
         const a30 = new Matrix3([
            [this.#m[0][1], this.#m[0][2], this.#m[0][3]],
            [this.#m[1][1], this.#m[1][2], this.#m[1][3]],
            [this.#m[2][1], this.#m[2][2], this.#m[2][3]]
         ]);

         const a31 = new Matrix3([
            [this.#m[0][0], this.#m[0][2], this.#m[0][3]],
            [this.#m[1][0], this.#m[1][2], this.#m[1][3]],
            [this.#m[2][0], this.#m[2][2], this.#m[2][3]]
         ]);

         const a32 = new Matrix3([
            [this.#m[0][0], this.#m[0][1], this.#m[0][3]],
            [this.#m[1][0], this.#m[1][1], this.#m[1][3]],
            [this.#m[2][0], this.#m[2][1], this.#m[2][3]]
         ]);

         const a33 = new Matrix3([
            [this.#m[0][0], this.#m[0][1], this.#m[0][2]],
            [this.#m[1][0], this.#m[1][1], this.#m[1][2]],
            [this.#m[2][0], this.#m[2][1], this.#m[2][2]]
         ]);
     
        return new Matrix4(
            [[a00.determinant/d, -a10.determinant/d, a20.determinant/d, -a30.determinant/d], 
            [-a01.determinant/d, a11.determinant/d, -a21.determinant/d, a31.determinant/d], 
            [a02.determinant/d, -a12.determinant/d, a22.determinant/d, -a32.determinant/d],
            [-a03.determinant/d, a13.determinant/d, -a23.determinant/d, a33.determinant/d]] );
    }

    get determinant ()
    {
        const m0 = new Matrix3([
            [this.m[1][1], this.m[1][2], this.m[1][3]],
            [this.m[2][1], this.m[2][2], this.m[2][3]],
            [this.m[3][1], this.m[3][2], this.m[3][3]]
        ]);
        const m1 = new Matrix3([
            [this.m[1][0], this.m[1][2], this.m[1][3]],
            [this.m[2][0], this.m[2][2], this.m[2][3]],
            [this.m[3][0], this.m[3][2], this.m[3][3]]
        ]);
        const m2 = new Matrix3([
            [this.m[1][0], this.m[1][1], this.m[1][3]],
            [this.m[2][0], this.m[2][1], this.m[2][3]],
            [this.m[3][0], this.m[3][1], this.m[3][3]]
        ]);
        const m3 = new Matrix3([
            [this.m[1][0], this.m[1][1], this.m[1][2]],
            [this.m[2][0], this.m[2][1], this.m[2][2]],
            [this.m[3][0], this.m[3][1], this.m[3][2]]
        ]);

        return this.#m[0][0] * m0.determinant - this.#m[0][1] * m1.determinant
            + this.#m[0][2] * m2.determinant - this.#m[0][3] * m3.determinant;    
    }

    get flattened () {
        return new Float32Array([
            this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0],
            this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1],
            this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2],
            this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]
        ]);
    }

    /** 
     * Creates a Matrix4 filled with random values
    */
    randomize() {
        for(let i=0; i<4; i++) {
            for(let j=0; j<4; j++) {
                this.#m[i][j] = Math.random();
            }
        }
    }
    /**
     * Resets the matrix to the identity matrix
     */
    setIdentity() {
        this.#m[0][0] = 1; this.#m[0][1] = 0; this.#m[0][2] = 0; this.#m[0][3] = 0;
        this.#m[1][0] = 0; this.#m[1][1] = 1; this.#m[1][2] = 0; this.#m[1][3] = 0;
        this.#m[2][0] = 0; this.#m[2][1] = 0; this.#m[2][2] = 1; this.#m[2][3] = 0;
        this.#m[3][0] = 0; this.#m[3][1] = 0; this.#m[3][2] = 0; this.#m[3][3] = 1;
    }
}