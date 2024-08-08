export class Vector4 
{
    /**
     * Builds a vector from the given coordinates
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     * @param {number} z - z coordinate
     * @param {number} w - w coordinate
     */
    constructor(x=0,y=0,z=0,w=1) 
    {
        this.x = this.y = this.z = 0; this.w = 1;

        if(Array.isArray(x) && x.length >= 4)
        {
            this.x = x[0]; this.y = x[1]; this.z = x[2]; this.w = x[3];
        }
        else{
            this.x = x; this.y = y; this.z = z; this.w = w;
        }
    }

    /**
     * Clones a vector
     * @return the clone
     */
    clone()
    {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    /**
     * Sets the componentes of the vector from the components of the given argument
     * @param {Vector4} other The vector being copied
     */
    copy(other)
    {
        //const ov = other.v;
        //this.#v.forEach( function (v, index) { this[index] = ov[index]; }, this.#v );
        this.setFromValues(other.x, other.y, other.z, other.w);

        return this;
    }

    /**
     * Computes the sum of two vectors
     * 
     * @param {Vector4} a - the first operand
     * @param {Vector4} b - the second operands
     * @return the sum of the two vectors
     */
    static add(a,b) 
    {
        return new Vector4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }

    /**
     * Computes the difference of two vectors
     * 
     * @param {Vector4} a - the first operand
     * @param {Vector4} b - the second operands
     * @return the difference between the two vectors
     */
    static sub(a,b) 
    {
        return new Vector4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    /**
     * Computes the dot product of two vectors
     * 
     * @param {Vector4} a - the first operand
     * @param {Vector4} b - the second operand
     * @return the dot product of the two vectors
     */ 
    static dot(a,b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }

    /**
     * Getters
     */
    get r () { return this.x; }
    get g () { return this.y; }
    get b () { return this.z; }
    get a () { return this.w; }
    get s () { return this.x; }
    get t () { return this.t; }
    get p () { return this.z; }
    get q () { return this.w; }

    get v () { return [this.x, this.y, this.z, this.w]; }

    /** 
     * Setters
     */
    
    set r (r) { this.x = r; }
    set g (g) { this.y = g; }
    set b (b) { this.z = b; }
    set a (a) { this.w = a; }
    set s (s) { this.x = s; }
    set t (t) { this.y = t; }
    set p (p) { this.z = p; }
    set q (q) { this.w = q; }

    /**
     * Returns the length of a vector
     */
    get length () 
    {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
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
        this.x = this.y = this.z = this.w = 0;

        return this;
    }

    /**
     * Adds a vector to this
     * @param {Vector4} other the vector to be added
     * @return this
     */
    add(other)
    {
        //const ov = other.v;
        //this.#v.forEach( function (v, index) { this[index] = v + ov[index]; }, this.#v );
        this.x += other.x; this.y += other.y; this.z += other.z; this.w += other.w;

        return this;
    }

    /**
     * Adds two vectors and set this to the result
     * @param {Vector4} a one of the vectors to be added
     * @param {Vector4} b the other vector to be added
     * @return this
     */
    add2(a, b)
    {
        this.x = a.x + b.x;
        this.y = a,y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;

        return this;
    }

    /**
     * Subtracts a vector from this
     * @param {Vector4} other the vector to be subtracted
     * @return this
     */
    sub(other)
    {
        //const ov = other.v;
        //this.#v.forEach( function(v, index) { this[index] = v - ov[index]; }, this.#v );
        this.x -= other.x; this.y -= other.y; this.z -= other.z; this.w -= other.w;

        return this;
    }

    /**
     * Subtracts two vectors and set this to the result
     * @param {Vector4} a the vector to be subtracted from 
     * @param {Vector4} b the other vector to be subtracted
     * @return this
     */
    sub2(a, b)
    {
        this.x = a.x - b.x;
        this.y = a,y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;

        return this;
    }

    /**
     * Computes the dot product of this and other vector
     * @param {Vector4} other 
     * @return dot product
     */
    dot(other)
    {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }

    /**
     * Scales this vector by a factor
     * @param {number} s the factor
     * @return this
     */
    scale(s) {
        //this.#v.forEach( function (v, index) { this[index] = v * s; }, this.#v );
        this.x *= s; this.y *= s; this.z *= s; this.w *= s;

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
        this.x /= l; this.y /= l; this.z /= l; this.w /=l ;

        return this;
    }


    /**
     * Sets each component to a random number in [0,1]
     * @return this
     */
    randomize() 
    {
        //this.#v.forEach( function (v, index) { this[index] = Math.random(); }, this.#v );
        this.x = Math.random(); this.y = Math.random(); this.z = Math.random(); this.w = Math.random();

        return this;
    }

    /**
     * Sets the vector components from the given arguments
     * @param {number} x x component value
     * @param {number} y y component value
     * @param {number} z z component value
     * @param {number} w w component value
     * @return this
     */
    setFromValues(x, y, z, w)
    {
        this.x = x; this.y = y; this.z = z; this.w = w;

        return this;
    }
}