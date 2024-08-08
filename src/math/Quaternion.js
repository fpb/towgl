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

        this.#v.x = s * axis.x / len;
        this.#v.y = s * axis.y / len;
        this.#v.z = s * axis.z / len;
        this.#v.w = Math.cos(a2);
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
        return new quaternion(this.#v.x * s, this.#v.y * s, this.#v.z * s, this.#v.w * s);
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
    get x () { return this.#v.x; }
    get y () { return this.#v.y; }
    get z () { return this.#v.z; }
    get w () { return this.#v.w; }

    /**
     * Setters
     */
    set x (x) { this.#v.x = x; }
    set y (y) { this.#v.y = y; }
    set z (z) { this.#v.z = z; }
    set w (w) { this.#v.w = w; }

    /**
     * Returns the conjugate of a quaternion
     */
    get conjugate()
    {
        return new quaternion(-this.#v.x, -this.#v.y, -this.#v.z, this.#v.w);
    }
    
    /*
    get matrix3 ()
    {
        const aa = this.#v.w * this.#v.w;
        const bb = this.#v.x * this.#v.x;
        const cc = this.#v.y * this.#v.y;
        const dd = this.#v.z * this.#v.z;
    
        const ab2 = 2 * this.#v.w * this.#v.x;
        const bc2 = 2 * this.#v.x * this.#v.y;
        const ad2 = 2 * this.#v.w * this.#v.z;
        const bd2 = 2 * this.#v.x * this.#v.z;
        const ac2 = 2 * this.#v.w * this.#v.y;
        const cd2 = 2 * this.#v.y * this.#v.z;

        return new mat3(new vec3(aa+bb-cc-dd, bc2+ad2,     bd2-ac2), 
                        new vec3(bc2-ad2,     aa-bb+cc-dd, cd2+ab2), 
                        new vec3(bd2+ac2,     cd2-ab2,     aa-bb-cc+dd));
    }
*/

    get matrix4 ()
    {
        const aa = this.#v.w * this.#v.w;
        const bb = this.#v.x * this.#v.x;
        const cc = this.#v.y * this.#v.y;
        const dd = this.#v.z * this.#v.z;
    
        const ab2 = 2 * this.#v.w * this.#v.x;
        const bc2 = 2 * this.#v.x * this.#v.y;
        const ad2 = 2 * this.#v.w * this.#v.z;
        const bd2 = 2 * this.#v.x * this.#v.z;
        const ac2 = 2 * this.#v.w * this.#v.y;
        const cd2 = 2 * this.#v.y * this.#v.z;

        return new mat4(new vec4(aa+bb-cc-dd, bc2+ad2,     bd2-ac2,     0), 
                        new vec4(bc2-ad2,     aa-bb+cc-dd, cd2+ab2,     0), 
                        new vec4(bd2+ac2,     cd2-ab2,     aa-bb-cc+dd, 0),
                        new vec4(0,           0,           0,           1));
    }
}