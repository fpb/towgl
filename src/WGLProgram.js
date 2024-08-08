import { WGLShader } from './WGLShader.js';

export class WGLProgram {
    
    #program;
    #attributes;
    #uniforms;

    static typename = undefined ;

    static #initTypeNames(gl)
    {
        WGLProgram.typename = {};

        WGLProgram.typename[gl.FLOAT]        = "gl.FLOAT";
        WGLProgram.typename[gl.FLOAT]        = "gl.FLOAT",
        WGLProgram.typename[gl.FLOAT_VEC2]   = "gl.FLOAT_VEC2",
        WGLProgram.typename[gl.FLOAT_VEC3]   = "gl.FLOAT_VEC3",
        WGLProgram.typename[gl.FLOAT_VEC4]   = "gl.FLOAT_VEC4",
        WGLProgram.typename[gl.INT]          = "gl.INT",
        WGLProgram.typename[gl.INT_VEC2]     = "gl.INT_VEC2",
        WGLProgram.typename[gl.INT_VEC3]     = "gl.INT_VEC3",
        WGLProgram.typename[gl.INT_VEC4]     = "gl.INT_VEC4",
        WGLProgram.typename[gl.BOOL]         = "gl.BOOL",
        WGLProgram.typename[gl.BOOL_VEC2]    = "gl.BOOL_VEC2",
        WGLProgram.typename[gl.BOOL_VEC3]    = "gl.BOOL_VEC3",
        WGLProgram.typename[gl.BOOL_VEC4]    = "gl.BOOL_VEC4",
        WGLProgram.typename[gl.FLOAT_MAT2]   = "gl.FLOAT_MAT2",
        WGLProgram.typename[gl.FLOAT_MAT3]   = "gl.FLOAT_MAT3",
        WGLProgram.typename[gl.FLOAT_MAT4]   = "gl.FLOAT_MAT4",
        WGLProgram.typename[gl.SAMPLER_2D]   = "gl.SAMPLER_2D",
        WGLProgram.typename[gl.SAMPLER_CUBE] = "gl.SAMPLER_CUBE"
    }

    /**
     * 
     * @param {Renderer} renderer 
     * @param {string} vertSrc 
     * @param {string} fragSrc 
     */
    constructor(renderer, vertSrc, fragSrc )
    {
        /** @type{WebGLRenderingContext} */
        const gl = renderer.context;

        if(!WGLProgram.typename) WGLProgram.#initTypeNames(gl);

        const program = gl.createProgram();

        const vertShader = new WGLShader(gl, gl.VERTEX_SHADER, vertSrc);
        const fragShader = new WGLShader(gl, gl.FRAGMENT_SHADER, fragSrc);

        gl.attachShader(program, vertShader.shader);
        gl.attachShader(program, fragShader.shader);

        gl.linkProgram(program);

        if(gl.getProgramParameter(program, gl.LINK_STATUS))
            this.#program = program;
        else this.#program = undefined;

        vertShader.dispose(gl);
        fragShader.dispose(gl);
        
        this.#getAttributes(gl);
        this.#getUniforms(gl);
    }

    /**
     * Returns the WebGLProgram handle
     */
    get program () { return this.#program; }

    get uniforms () {
        return this.#uniforms;
    }

    get attributes () {
        return this.#attributes;
    }

    /**
     * Deletes the program
     * @param {Renderer} renderer 
     */
    dispose(renderer) 
    {
        const gl = renderer.context;

        gl.deleteProgram(this.#program);
    }

    #getAttributes (gl)
    {
        this.#attributes = {};

        const nAttrs = gl.getProgramParameter(this.#program, gl.ACTIVE_ATTRIBUTES);
        for(let i=0; i<nAttrs; i++) {
            const attr = gl.getActiveAttrib(this.#program, i);
            const location = gl.getAttribLocation(this.#program, attr.name);
            this.#attributes[attr.name] = { name: attr.name, type: attr.type, size: attr.size, location: location};
        }
    }

    #getUniforms (gl)
    {
        this.#uniforms = {};

        const nAttrs = gl.getProgramParameter(this.#program, gl.ACTIVE_UNIFORMS);
        for(let i=0; i<nAttrs; i++) {
            const unif = gl.getActiveUniform(this.#program, i);
            const location = gl.getUniformLocation(this.#program, unif.name);
            this.#uniforms[unif.name] = {name :unif.name, type: unif.type, size: unif.size, location: location};
        }
    }

};