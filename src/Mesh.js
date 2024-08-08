import { Program } from './Program.js' ;
import { Object3D } from './Object3D.js' ;

export class Mesh extends Object3D  {
    #geometry;
    #material;
    #wireframe;

    /**
     * Builds a Mesh by combining a geometry (points, normals, edges, faces, etc.) with a material
     * @param {*} geom 
     * @param {*} mat 
     */
    constructor(geom, mat) {
        super();
        this.#geometry = geom;
        this.#material = mat;
    }

    /**
     * 
     */
    get geometry () { return this.#geometry; }

    /**
     * 
     */
    get material () { return this.#material; }

    /**
     * Returns true since Mesh objects contain a mesh with geometry
     */
    get hasMesh () { return true; }
}