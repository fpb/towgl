import { Uint16BufferedAttribute, Uint32BufferedAttribute } from './BufferedAttribute.js';

export class BufferedGeometry 
{
    // Attributes defined for the geometry. Translates the name to the actual data array
    #attributes;

    // 
    #indices;

    // Face groups
    #groups;

    /**
     * 
     */
    constructor() 
    {
        // Initialize attributes
        this.#attributes = {};

        this.#indices =  null;

        // Initialize face groups
        this.#groups = [];

    }

    /**
     * Sets an attribute
     * @param {String} name 
     * @param {BufferedAttribute} attribute 
     * @returns this
     */
    setAttribute(name, attribute)
    {
        this.#attributes[name] = attribute;
        return this;
    }

    /**
     * Sets the indices for the BufferedGeometry
     * 
     * @param { Array | TypedArray} indices Array containing the indices
     * @return this
     */
    setIndices(indices)
    {
        if(Array.isArray(indices) && indices.length > 0) { // Check for normal js Array
            if(indices.reduce((a,b) => Math.max(a,b) > 65535))
                this.#indices = new Uint32BufferedAttribute(indices, 1);
            else
                this.#indices = new Uint16BufferedAttribute(indices, 1);
        }
        else 
            // Assume this is already a UintXXBuffere    
            this.#indices = indices;

        return this;
    }

    /**
     * Adds a group of faces to the geometry.
     * 
     * @param {Number} firstIndex - First vertex index of the group
     * @param {Number} count - Number of vertices in the group
     * @param {Number} material - Material index, default is 0
     */
    addGroup(firstIndex, count, material = 0)
    {
        this.#groups.push( { firstIndex: firstIndex, count: count, material: material});
    }

    /**
     * 
     */
    get attributes () { return this.#attributes; }

    /**
     * 
     */
    get indices () { return this.#indices; }
    
}
