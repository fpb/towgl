import { Euler } from "./math/Euler.js";
import { Matrix4 } from "./math/Matrix4.js";
import { Vector3 } from "./math/Vector3.js";

/**
 * 
 */
export class Object3D {

    // The array with the node's children
    #children;

    // The parent node
    #parent;

    // Current translation
    #position;

    // Euler angles of current rotation
    #rotation;

    // Current scale
    #scale;

    // Current local transformation of the node (T.R.S) order
    #transform;

    // Object to World transformation
    #localToWorld;

    /**
     * Creates an Object3D that holds a local transformation and a list of child nodes
     */
    constructor() {
        this.#children = [];
        this.#parent = null;
        this.#position = new Vector3(0, 0, 0);
        this.#rotation = new Euler(0, 0, 0);
        this.#scale = new Vector3(1, 1, 1);

        this.#transform = new Matrix4();
        this.#localToWorld = undefined;
    }

    /**
     * Adds a child object
     */
    add(c) {
        /* removes the object from its current parent if it has one */
        if (c.#parent)
            c.#parent.remove(this);

        /* Adds the object to the list of children */
        this.#children.push(c);

        /* Finally, set the child's parent object to this object */
        c.#parent = this;
    }

    /**
     * Removes a child object
     */
    remove(c) {
        /* Search for the child in the list of children */
        const index = this.#children.indexOf(c);

        /* If c is a child object... */
        if (index != -1)

            /* Remove it from the list of children */
            this.#children.splice(index, 1);

        /* Unparent the removed child */
        c.#parent = null;
    }

    /**
     * 
     * @param {Matrix4} parentLocalToWorld 
     */
    update(parentLocalToWorld) {
        /* post multiply parent's localToWorld transform with object's local 
           transform
        */
        this.#localToWorld = Matrix4.mult(parentLocalToWorld, this.transform);

        for (const child of this.#children) {
            child.update(this.#localToWorld);
        }
    }

    /**
     * Updates the node's current transformation
     */
    #rebuildTransform() {
        this.#transform = Matrix4.mult(Matrix4.translation(this.#position.v), Matrix4.mult(this.#rotation.m, Matrix4.scale(this.#scale.v)));;
    }

    /**
     * Sets the translation component of the local transformation
     * @param {Vector3} p
     */
    set position(p) {
        this.#position = p;

        this.#rebuildTransform();
    }

    /**
     * returns the translation component of the local transformation
     */
    get position() {
        return this.#position;
    }

    /**
     * Resets the object's transformation
     */
    resetTransform() {
        this.#position.clear();
        this.#rotation.reset();
        this.#scale.setFromValues(1, 1, 1);

        this.#transform.setIdentity();
    }

    /**
     * 
     */
    get rotX() {
        return this.#rotation.x;
    }

    /**
     * 
     */
    get rotY() {
        return this.#rotation.y;
    }

    /**
     * 
     */
    get rotZ() {
        return this.#rotation.z;
    }

    /**
     * 
     */
    set rotX(angle) {
        this.#rotation.x = angle;

        this.#rebuildTransform();
    }

    /**
     * 
     */
    set rotY(angle) {
        this.#rotation.y = angle;

        this.#rebuildTransform();
    }

    /**
     * 
     */
    set rotZ(angle) {
        this.#rotation.z = angle;

        this.#rebuildTransform();
    }

    /**
     * 
     */
    get parent() { return this.#parent; }

    /**
     * 
     */
    get children() {
        return this.#children;
    }

    /**
     * 
     */
    get transform() { return this.#transform; }

    /**
     * Returns the object's local to world transformation (modelling transformation). The returned value can be used to transform
     * points and vectors from local, modelling, coordinates to world coordinates.
     */
    get localToWorld() { return this.#localToWorld; }

    /**
     * Returns false since Object3D objects do not have any mesh. They simply hold transformations and child nodes.
     */
    get hasMesh() { return false; }
}