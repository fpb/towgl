/**
 * Class representing an attribute stored in a buffer
 */
class BufferedAttribute {

    static get StaticDraw ()  { return 35044; }
    static get DynamicDraw () { return 35048; }

    #array;
    #itemSize;
    #normalized;
    
    #needsUpdate;
    #usage;

    #buffer;

    constructor(array, itemSize, normalized = false) 
    {
        this.#array = array;
        this.#itemSize  = itemSize;
        this.#normalized = normalized;

        this.#needsUpdate = false;
        this.#usage = BufferedAttribute.StaticDraw;

        this.#buffer = undefined;
    }

    /**
     * Clones this BufferedAttribute
     * 
     * @return the newly created BufferedAttribute
     */
    clone()
    {
        return this.constructor(this.array.slice(), this.#itemSize).copy(this);
    }

    /**
     * Copies a BufferedAttribute into this
     * 
     * @param {*} other the source buffered attribute
     * @return this
     */
    copy( other )
    {
        this.#array = other.array.slice();
        this.#itemSize = other.itemSize;
        this.#normalized = other.normalized;

        this.#needsUpdate = other.needsUpdate;
        this.#usage = other.usage;

        this.#buffer = undefined;

        return this;
    }

    /**
     * The array storing the data
     */
    get array () { return this.#array; }

    /** the number of items stored in the array */
    get count () { return this.#array.length / this.itemSize; }

    /** the number of entries that correspond to a single attribute value */
    get itemSize () { return this.#itemSize; }

    get normalized () { return this.#normalized; }
    get needsUpdate() { return this.#needsUpdate; }
    get usage () { return this.#usage; }

    get buffer () { return this.#buffer; }
    set buffer (buf) { this.#buffer = buf; }
};

class Int8BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Int8Array(array), itemSize, normalized);
    }
}

class Int16BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Int16Array(array), itemSize, normalized);
    }
}

class Int32BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Int32Array(array), itemSize, normalized);
    }
}

class Uint8BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Uint8Array(array), itemSize, normalized);
    }
}

class Uint16BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Uint16Array(array), itemSize, normalized);
    }
}

class Uint32BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Uint32Array(array), itemSize, normalized);
    }
}

class Float16BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Float16Array(array), itemSize, normalized);
    }
}

class Float32BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Float32Array(array), itemSize, normalized);
    }
}

class Float64BufferedAttribute extends BufferedAttribute {
    constructor( array, itemSize, normalized ) {
        super( new Float64Array(array), itemSize, normalized);
    }
}

export {
    Int8BufferedAttribute,
    Int16BufferedAttribute,
    Int32BufferedAttribute,
    Uint8BufferedAttribute,
    Uint16BufferedAttribute,
    Uint32BufferedAttribute,
    Float16BufferedAttribute,
    Float32BufferedAttribute,
    Float64BufferedAttribute,
    BufferedAttribute
}