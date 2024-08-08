export class Vector2 
{
    /**
     * Builds a vector from the given coordinates
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     */
    constructor(x=0,y=0) 
    {
        this.x = this.y = 0;

        if(Array.isArray(x) && x.length >= 4)
        {
            this.x = x[0]; this.y = x[1];
        }
        else{
            this.x = x; this.y = y;
        }
    }

    /**
     * Clones a vector
     * @return the clone
     */
    clone()
    {
        return new Vector2(this.x, this.y);
    }

    /**
     * Sets the componentes of the vector from the components of the given argument
     * @param {Vector2} other The vector being copied
     */
    copy(other)
    {
        //const ov = other.v;
        //this.#v.forEach( function (v, index) { this[index] = ov[index]; }, this.#v );
        this.setFromValues(other.x, other.y);

        return this;
    }

    /**
     * Computes the sum of two vectors
     * 
     * @param {Vector2} a - the first operand
     * @param {Vector2} b - the second operands
     * @return the sum of the two vectors
     */
    static add(a,b) 
    {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    /**
     * Computes the difference of two vectors
     * 
     * @param {Vector2} a - the first operand
     * @param {Vector2} b - the second operands
     * @return the difference between the two vectors
     */
    static sub(a,b) 
    {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    /**
     * Computes the dot product of two vectors
     * 
     * @param {Vector2} a - the first operand
     * @param {Vector2} b - the second operand
     * @return the dot product of the two vectors
     */ 
    static dot(a,b) {
        return a.x * b.x + a.y * b.y;
    }

    /**
     * Getters
     */
    get r () { return this.x; }
    get g () { return this.y; }

    get v () { return [this.x, this.y]; }

    /** 
     * Setters
     */
    
    set r (r) { this.x = r; }
    set g (g) { this.y = g; }

    /**
     * Returns the length of a vector
     */
    get length () 
    {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * Sets the length of a vector
     * @param {number} n new length
     * @return this
     */
    set length (n)
    {
        const factor = n/this.length;
        this.scale(factor);    
    }

    /**
     * Sets all the components to 0
     * @return this
     */
    clear() 
    {
        //this.#v.forEach( function (v, index) { this[index] = 0; }, this.#v );
        this.x = this.y = 0;

        return this;
    }

    /**
     * Adds a vector to this
     * @param {Vector2} other the vector to be added
     * @return this
     */
    add(other)
    {
        //const ov = other.v;
        //this.#v.forEach( function (v, index) { this[index] = v + ov[index]; }, this.#v );
        this.x += other.x; this.y += other.y;

        return this;
    }

    /**
     * Adds two vectors and set this to the result
     * @param {Vector2} a one of the vectors to be added
     * @param {Vector2} b the other vector to be added
     * @return this
     */
    add2(a, b)
    {
        this.x = a.x + b.x;
        this.y = a,y + b.y;

        return this;
    }

    /**
     * Subtracts a vector from this
     * @param {Vector2} other the vector to be subtracted
     * @return this
     */
    sub(other)
    {
        //const ov = other.v;
        //this.#v.forEach( function(v, index) { this[index] = v - ov[index]; }, this.#v );
        this.x -= other.x; this.y -= other.y;

        return this;
    }

    /**
     * Subtracts two vectors and set this to the result
     * @param {Vector2} a the vector to be subtracted from 
     * @param {Vector2} b the other vector to be subtracted
     * @return this
     */
    sub2(a, b)
    {
        this.x = a.x - b.x;
        this.y = a,y - b.y;

        return this;
    }

    /**
     * Computes the dot product of this and other vector
     * @param {Vector2} other 
     * @return dot product
     */
    dot(other)
    {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Scales this vector by a factor
     * @param {number} s the factor
     * @return this
     */
    scale(s) {
        //this.#v.forEach( function (v, index) { this[index] = v * s; }, this.#v );
        this.x *= s; this.y *= s;

        return this;
    }

    /**
     * Normalizes a vector (unit length)
     * @return this
     */
    normalize() 
    {
        let l = this.length;

        //this.#v.forEach( function (v, index) { this[index] = v / l; }, this.#v );
        this.x /= l; this.y /= l;

        return this;
    }


    /**
     * Sets each component to a random number in [0,1]
     * @return this
     */
    randomize() 
    {
        //this.#v.forEach( function (v, index) { this[index] = Math.random(); }, this.#v );
        this.x = Math.random(); this.y = Math.random();

        return this;
    }

    /**
     * Sets the vector components from the given arguments
     * @param {number} x x component value
     * @param {number} y y component value
     * @return this
     */
    setFromValues(x, y)
    {
        this.x = x; this.y = y;

        return this;
    }
}