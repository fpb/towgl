import { Matrix4 } from './Matrix4.js';
import { Vector3 } from './Vector3.js';

/**
 * 
 */
export class Euler {

        #angles;
        #order;

        static orders = { XYZ : 1,  XZY: 2, YXZ : 3, YZX: 4, ZXY: 5, ZYX : 6};
        static defaultOrder = Euler.orders.XYZ;

        /**
         * 
         * @param {*} x 
         * @param {*} y 
         * @param {*} z 
         * @param {*} order 
         */
        constructor( x = 0, y = 0, z = 0, order = Euler.defaultOrder)
        {
            this.#angles = new Vector3(x, y, z);
            this.#order = order;
        }

        /**
         * Getters
         */
        get x () { return this.#angles.x; }
        get y () { return this.#angles.y; }
        get z () { return this.#angles.z; }
        
        get order () { return this.#order; }

        /**
         * Returns a matrix with the composition of the rotations in the established order
         */
        get m () 
        { 
            const rx = Matrix4.rotationX( this.#angles.x );
            const ry = Matrix4.rotationY( this.#angles.y );
            const rz = Matrix4.rotationZ( this.#angles.z );

            switch( this.#order ) {
                case Euler.orders.XYZ:
                    return Matrix4.mult( Matrix4.mult(rx, ry), rz);
                case Euler.orders.XZY:
                    return Matrix4.mult( Matrix4.mult(rx, rz), ry);
                case Euler.orders.YXZ:
                    return Matrix4.mult( Matrix4.mult(ry, rx), rz);
                case Euler.orders.YZX:
                    return Matrix4.mult( Matrix4.mult(ry, rz), rx);
                case Euler.orders.ZXY:
                    return Matrix4.mult( Matrix4.mult(rz, rx), ry);
                case Euler.orders.ZYX:
                    return Matrix4.mult( Matrix4.mult(rz, ry), rx);                                                
            }
        };
        /**
         * Setters
         */
         set x (x) { this.#angles.x = x; }
         set y (y) { this.#angles.y = y; }
         set z (z) { this.#angles.z = z; }

 }