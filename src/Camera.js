import { Matrix4 } from './math/Matrix4.js' ;
import { Vector3 } from './math/Vector3.js';
import { Object3D } from './Object3D.js';

/**
 * Camera base class. Implements an Object3D that only supports rigid body transforms and has no children.
 */
export class Camera extends Object3D {
    // The projection matrix
    #m;

    /**
     * 
     */
    constructor() {
        super();

        this.#m = new Matrix4();
    }

    /**
     * 
     */
    get matrix () 
    {
        return this.#m;
    }

    /** 
     * Positions and orientates the camera in World Space
     * 
     * @param {Vector3} eye The location of the camera
     * @param {Vector3} at the point where it points
     * @param {Vector3} up a vector used to determine the vertical camera axis
     * @return this
     * */ 
    lookAt(eye, at, up) {
        n = Vector3.sub(eye, at).normalize();
        u = Vector3.cross(up, n).normalize();
        v = Vector3.cross(n, u);

        const T = Matrix4.translation(-eye.x, -eye.y, -eye.z);
        const R = new Matrix4(u.x, u.y, u.z, 0.0,
                              v.x, v.y, v.z, 0.0,
                              n.x, n.y, n.z, 0.0,
                              0.0, 0.0, 0.0, 1.0);

        let view = Matrix4.mult(R, T);
        this.#m = Matrix4.inverse();
        return this;
    }

    /**
     * The transform of an object is the object to world. The transformation that position and points the camera in world space
     * is the inverse of the worldToCamera (view) transform.
     */
    get worldToCamera () { return this.transform.inverse; }
    /**
     * Adds a child object
     */
     add(c) {}

    /**
     * Removes a child object
     */
    remove(c) {}

    /**
     * Unparents the node
     */
    #unparent() {}



    /**
     * 
     * @param {*} s1 
     * @param {*} s2 
     * @param {*} s3 
     */
    scale(s1, s2, s3) {
        // Do nothing. Camera only allows for rigid-body transform
    }

    /**
     * 
     */
    get parent() 
    { 
        return null; 
    }

    /**
     * Returns the children of the camera.
     * 
     * @returns null, since cameras are nota supposed to have children
     */
    get children() 
    {
        return null;
    }

}
