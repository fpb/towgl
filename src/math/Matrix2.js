/** 
 * @module Matrix2
 * */
 import { Vector2 } from './Vector2.js';

 const dim = 2;

 export class Matrix2 {
     
     #m;
 
     /** Represents a 2x2 matrix of real values.
      * @constructor
      * @param {Matrix2 | Array} m - another Matrix3 object to clone, an array of 2x2 real numbers or an array of 4 real numbers.
      */
     constructor(m) 
     {
         this.#m = [ [1, 0],
                     [0, 1] ];
 
         if(Array.isArray(m)) {
             if(Array.isArray(m[0])) {
                 if(m.length == dim && m[0].length == dim) {
                     // The passed array is a 2x2 matrix
                     for(let i=0; i<dim; i++)
                         for(let j=0; j<dim; j++)
                             this.#m[i][j] = m[i][j];
                 }
                 else throw new Error("Matrix2: bidimensional array with wrong dimensions");
             }
             else {
                 if(m.length == dim*dim) {
                     // A unidimensional array is also fine, as long as it has 9 entries.
                     let k=0;
                     for(let i=0; i<dim; i++) {
                         for(let j=0; j<dim; j++) {
                             this.#m[i][j] = m[k++]; // Entries are filled in row major order
                         }
                     }
                 }
                 else throw new Error("Matrix2: unidimensional array with wrong size. Nine elements required!");
             }
         } else {
             if(m instanceof Matrix2) {
                 for(let i=0; i<dim; i++) {
                     for(let j=0; j<dim; j++) {
                         this.#m[i][j] = m.m[i][j];
                     }
                 }
             }
             else if(!!m) {
                 throw new Error("Matrix2: passed object not compatible: " + typeof m);
             }
         }
     }
     
     static dot(m1, m2, l1, c2) {
         let sum = 0;
         for(let i=0; i<dim; i++) {
             sum += m1.#m[l1][i] * m2.#m[i][c2];
         }
         return sum;
     }
 
     static mult(m1, m2) {
         if(m2 instanceof Vector2) {
             let v = [];
             for(let i=0; i<dim; i++) {
                 let sum = 0;
                 for(let j=0; j<dim; j++) {
                     sum += m1.#m[i][j] + m2.v[j];
                 }
                 v.push(sum);
             }
             return new Vector2(v);
         }
         else {
             let temp = [];
             for(let i=0; i<dim; i++) {
                 for(let j=0; j<dim; j++) {
                     temp.push(Matrix2.dot(m1, m2, i, j));
                 }
             }
             return new Matrix2(temp);
         }
     }
 
     static add(m1, m2) {
         let m = new Matrix2([ m1.m[0][0] + m2.m[0][0], m1.m[0][1] + m2.m[0][1], 
                            m1.m[1][0] + m2.m[1][0], m1.m[1][1] + m2.m[1][1], 
                            m1.m[2][0] + m2.m[2][0], m1.m[2][1] + m2.m[2][1]]);
         return m;
     }
 
     static sub(m1, m2) {
         let m = new Matrix2([ m1.m[0][0] - m2.m[0][0], m1.m[0][1] - m2.m[0][1],
                            m1.m[1][0] - m2.m[1][0], m1.m[1][1] - m2.m[1][1], 
                            m1.m[2][0] - m2.m[2][0], m1.m[2][1] - m2.m[2][1]]);
         return m;
     }
 

 
     get diag () {
         return [this.#m[0][0], this.#m[1][1]];
     }
 
     get m () {
         return this.#m;
     }
 
     get inverse () {
        const d = this.determinant;


        a[0][0] = m[1][1]/d;
        a[0][1] = -m[0][1]/d;
        a[1][0] = -m[1][0]/d;
        a[1][1] = m[0][0]/d;
        
        return new Matrix2([
            [this.m[0][0]/d, -this.m[0][1]/d],
            [-this.m[1][0]/d, this.m[1][1]]
        ]);
     }
 
     get determinant ()
     {
        const d = this.m[0][0] * this.m[1][1] - this.m[0][1] * this.m[1][0];

        return d;
    }
 
     get flattened () {
         return new Float32Array([
             this.m[0][0], this.m[1][0], 
             this.m[0][1], this.m[1][1]
         ]);
     }
 
     /** 
      * Creates a Matrix4 filled with random values
     */
     randomize() {
         for(let i=0; i<dim; i++) {
             for(let j=0; j<dim; j++) {
                 this.m[i][j] = Math.random();
             }
         }
     }
     /**
      * Resets the matrix to the identity matrix
      */
     setIdentity() {
         this.m[0][0] = 1; this.m[0][1] = 0; 
         this.m[1][0] = 0; this.m[1][1] = 1; 
     }
 }