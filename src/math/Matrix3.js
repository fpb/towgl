/** 
 * @module Matrix3
 * */
 import { Vector3 } from './Vector3.js';
 import { Matrix2 } from './Matrix2.js';

 export class Matrix3 {
     
     #m;
 
     /** Represents a 3x3 matrix of real values.
      * @constructor
      * @param {Matrix3 | Array} m - another Matrix3 object to clone, an array of 3x3 real numbers or an array of 9 real numbers.
      */
     constructor(m) 
     {
         this.#m = [ [1, 0, 0],
                     [0, 1, 0],
                     [0, 0, 1] ];
 
         if(Array.isArray(m)) {
             if(Array.isArray(m[0])) {
                 if(m.length == 3 && m[0].length == 3) {
                     // The passed array is a 3x3 matrix
                     for(let i=0; i<3; i++)
                         for(let j=0; j<3; j++)
                             this.#m[i][j] = m[i][j];
                 }
                 else throw new Error("Matrix3: bidimensional array with wrong dimensions");
             }
             else {
                 if(m.length == 9) {
                     // A unidimensional array is also fine, as long as it has 9 entries.
                     let k=0;
                     for(let i=0; i<3; i++) {
                         for(let j=0; j<3; j++) {
                             this.#m[i][j] = m[k++]; // Entries are filled in row major order
                         }
                     }
                 }
                 else throw new Error("Matrix3: unidimensional array with wrong size. Nine elements required!");
             }
         } else {
             if(m instanceof Matrix3) {
                 for(let i=0; i<3; i++) {
                     for(let j=0; j<3; j++) {
                         this.#m[i][j] = m.m[i][j];
                     }
                 }
             }
             else if(!!m) {
                 throw new Error("Matrix3: passed object not compatible: " + typeof m);
             }
         }
     }
     
     static dot(m1, m2, l1, c2) {
         let sum = 0;
         for(let i=0; i<3; i++) {
             sum += m1.#m[l1][i] * m2.#m[i][c2];
         }
         return sum;
     }
 
     static mult(m1, m2) {
         if(m2 instanceof Vector3) {
             let v = [];
             for(let i=0; i<3; i++) {
                 let sum = 0;
                 for(let j=0; j<3; j++) {
                     sum += m1.#m[i][j] + m2.v[j];
                 }
                 v.push(sum);
             }
             return new Vector3(v);
         }
         else {
             let temp = [];
             for(let i=0; i<3; i++) {
                 for(let j=0; j<3; j++) {
                     temp.push(Matrix3.dot(m1, m2, i, j));
                 }
             }
             return new Matrix3(temp);
         }
     }
 
     static add(m1, m2) {
         let m = new Matrix3([ m1.m[0][0] + m2.m[0][0], m1.m[0][1] + m2.m[0][1], m1.m[0][2] + m2.m[0][2],
                            m1.m[1][0] + m2.m[1][0], m1.m[1][1] + m2.m[1][1], m1.m[1][2] + m2.m[1][2],
                            m1.m[2][0] + m2.m[2][0], m1.m[2][1] + m2.m[2][1], m1.m[2][2] + m2.m[2][2]]);
         return m;
     }
 
     static sub(m1, m2) {
         let m = new Matrix3([ m1.m[0][0] - m2.m[0][0], m1.m[0][1] - m2.m[0][1], m1.m[0][2] - m2.m[0][2],
                            m1.m[1][0] - m2.m[1][0], m1.m[1][1] - m2.m[1][1], m1.m[1][2] - m2.m[1][2], 
                            m1.m[2][0] - m2.m[2][0], m1.m[2][1] - m2.m[2][1], m1.m[2][2] - m2.m[2][2]]);
         return m;
     }
 
     /** 
      * Represents a 3x3 2D scaling matrix in homogeneous coordinates
      * @param {number | Array} s1 - either the x scaling or a vector containing the 2 scaling factors
      * @param {number} s2 - the y scaling factor
      */
     static scale(s1, s2) {
         let m = new Matrix3();
         if(Array.isArray(s1)) {
             m.m[0][0] = s1[0]; m.m[1][1] = s1[1]; m.m[2][2] = 1;
         }
         else {
             m.m[0][0] = s1; m.m[1][1] = s2; m.m[2][2] = 1;
         }
         return m;
     }
 
     /** 
      * Represents a 3x3 2D translation matrix with homogeneous coordinates 
      * @param {number | Array} t1 - either the x component for the translation vector or an array containing the 2 components of the translation vector
      * @param {number} t2 - the y component of the translation vector
     */
     static translation(t1, t2) {
         let m = new Matrix3();
         if(Array.isArray(t1)) {
             m.m[0][2] = t1[0];
             m.m[1][2] = t1[1];
         } else {
             m.m[0][2] = t1;
             m.m[1][2] = t2;
         }
         return m;
     }
 
     /**
      * Represents a 3x3 2D rotation matrix around the Z axis
      * @param {number} angle - the rotatin angle in degrees
      */
     static rotationZ(angle) {
         let c = Math.cos(angle * Math.PI / 180.0);
         let s = Math.sin(angle * Math.PI / 180.0);
         let m = [ [ c, -s,  0],
                   [ s,  c,  0],
                   [ 0,  0,  1]];
         return new Matrix3(m);
     }
 
     get diag () {
         return [this.#m[0][0], this.#m[1][1], this.#m[2][2]];
     }
 
     get m () {
         return this.#m;
     }
 
     get inverse () {

        const d = this.determinant;
    
        const a00 = new Matrix2(
           [this.#m[1][1], this.#m[1][2]],
           [this.#m[2][1], this.#m[2][2]]
        );
        const a01 = new Matrix2(
           [this.#m[1][0], this.#m[1][2]],
           [this.#m[2][0], this.#m[2][2]]
        );
        const a02 = new Matrix2(
           [this.#m[1][0], this.#m[1][1]],
           [this.#m[2][0], this.#m[2][1]]
        );
        const a10 = new Matrix2(
           [this.#m[0][1], this.#m[0][2]],
           [this.#m[2][1], this.#m[2][2]]
        );
        const a11 = new Matrix2(
           [this.#m[0][0], this.#m[0][2]],
           [this.#m[2][0], this.#m[2][2]]
        );
        const a12 = new Matrix2(
           [this.#m[0][0], this.#m[0][1]],
           [this.#m[2][0], this.#m[2][1]]
        );
        const a20 = new Matrix2(
           [this.#m[0][1], this.#m[0][2]],
           [this.#m[1][1], this.#m[1][2]]
        );
        const a21 = new Matrix2(
           [this.#m[0][0], this.#m[0][2]],
           [this.#m[1][0], this.#m[1][2]]
        );
        const a22 = new Matrix2(
           [this.#m[0][0], this.#m[0][1]],
           [this.#m[1][0], this.#m[1][1]]
        );
    
        return new Matrix3( 
            [a00.determinant/d, -a10.determinant/d, a20.determinant/d], 
            [-a01.determinant/d, a11.determinant/d, -a21.determinant/d], 
            [a02.determinant/d, -a12.determinant/d, a22.determinant/d]
        );
     }
 
     get determinant ()
     {
        const d = this.#m[0][0]*this.#m[1][1]*this.#m[2][2] + 
                  this.#m[0][1]*this.#m[1][2]*this.#m[2][0] + 
                  this.#m[0][2]*this.#m[2][1]*this.#m[1][0] -
                  this.#m[2][0]*this.#m[1][1]*this.#m[0][2] -
                  this.#m[1][0]*this.#m[0][1]*this.#m[2][2] -
                  this.#m[0][0]*this.#m[1][2]*this.#m[2][1] ;
    return d;
    }
 
     get flattened () {
         return new Float32Array([
             this.m[0][0], this.m[1][0], this.m[2][0],
             this.m[0][1], this.m[1][1], this.m[2][1],
             this.m[0][2], this.m[1][2], this.m[2][2]
         ]);
     }
 
     /** 
      * Creates a Matrix4 filled with random values
     */
     randomize() {
         for(let i=0; i<3; i++) {
             for(let j=0; j<3; j++) {
                 this.#m[i][j] = Math.random();
             }
         }
     }
     /**
      * Resets the matrix to the identity matrix
      */
     setIdentity() {
         this.#m[0][0] = 1; this.#m[0][1] = 0; this.#m[0][2] = 0; 
         this.#m[1][0] = 0; this.#m[1][1] = 1; this.#m[1][2] = 0; 
         this.#m[2][0] = 0; this.#m[2][1] = 0; this.#m[2][2] = 1; 
     }
 }