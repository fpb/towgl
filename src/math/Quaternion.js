import { vec3 } from './Vector3.js';
import { vec4 } from './Vector4.js';
//import { mat3 } from './mat3.js';
import { mat4 } from './Matrix4.js';

export class quaternion {
    #q;

    constructor(x=0, y=0, z=0, w=1)
    {
        this.#q = new vec4(x,y,z,w);
    }

    /**
     * Sets a quaternion from an axis of rotaion and an angle
     * @param {vec3} axis - axis of rotation
     * @param {Number} angle - angle to rotate (in degrees)
     */
    setFromAxisAndAngle(axis, angle)
    {
        const len = axis.length;

        // Convert angle to radians
        let a2 = angle * Math.PI / 360;
        const s = Math.sin(a2);

        this.#q.x = s * axis.x / len;
        this.#q.y = s * axis.y / len;
        this.#q.z = s * axis.z / len;
        this.#q.w = Math.cos(a2);
    }

    /**
     * Multiplies two quaternions
     * 
     * @param {quaternion} q1 
     * @param {quaternion} q2 
     */
    static mult(q1, q2)
    {
        return new quaternion(
            a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,      // a1b2+b1a2+c1d2-d1c2,
            a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,      // a1c2-b1d2+c1a2+d1b2,
            a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w,      // a1d2+b1c2-c1b2+d1a2
            a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z       // a1a2-b1b2-c1c2-d1d2,
        );
    }

    /**
     * Scales a quaternion by a number
     * 
     * @param {quaternion} q 
     * @param {Number} s 
     */
    static scale(q, s)
    {
        return new quaternion(q.#q.x * s, q.#q.y * s, q.#q.z * s, q.#q.w * s);
    }

    /**
     * Normalizes a quaternion 
     */
    normalize()
    {
        this.#q.normalize();
    }

    /**
     * Getters
     */
    get x () { return this.#q.x; }
    get y () { return this.#q.y; }
    get z () { return this.#q.z; }
    get w () { return this.#q.w; }

    /**
     * Setters
     */
    set x (x) { this.#q.x = x; }
    set y (y) { this.#q.y = y; }
    set z (z) { this.#q.z = z; }
    set w (w) { this.#q.w = w; }

    /**
     * Returns the conjugate of a quaternion
     */
    get conjugate()
    {
        return new quaternion(-this.#q.x, -this.#q.y, -this.#q.z, this.#q.w);
    }
    
    /*
    get matrix3 ()
    {
        const aa = this.#q.w * this.#q.w;
        const bb = this.#q.x * this.#q.x;
        const cc = this.#q.y * this.#q.y;
        const dd = this.#q.z * this.#q.z;
    
        const ab2 = 2 * this.#q.w * this.#q.x;
        const bc2 = 2 * this.#q.x * this.#q.y;
        const ad2 = 2 * this.#q.w * this.#q.z;
        const bd2 = 2 * this.#q.x * this.#q.z;
        const ac2 = 2 * this.#q.w * this.#q.y;
        const cd2 = 2 * this.#q.y * this.#q.z;

        return new mat3(new vec3(aa+bb-cc-dd, bc2+ad2,     bd2-ac2), 
                        new vec3(bc2-ad2,     aa-bb+cc-dd, cd2+ab2), 
                        new vec3(bd2+ac2,     cd2-ab2,     aa-bb-cc+dd));
    }
*/

    get matrix4 ()
    {
        const aa = this.#q.w * this.#q.w;
        const bb = this.#q.x * this.#q.x;
        const cc = this.#q.y * this.#q.y;
        const dd = this.#q.z * this.#q.z;
    
        const ab2 = 2 * this.#q.w * this.#q.x;
        const bc2 = 2 * this.#q.x * this.#q.y;
        const ad2 = 2 * this.#q.w * this.#q.z;
        const bd2 = 2 * this.#q.x * this.#q.z;
        const ac2 = 2 * this.#q.w * this.#q.y;
        const cd2 = 2 * this.#q.y * this.#q.z;

        return new mat4(new vec4(aa+bb-cc-dd, bc2+ad2,     bd2-ac2,     0), 
                        new vec4(bc2-ad2,     aa-bb+cc-dd, cd2+ab2,     0), 
                        new vec4(bd2+ac2,     cd2-ab2,     aa-bb-cc+dd, 0),
                        new vec4(0,           0,           0,           1));
    }
}