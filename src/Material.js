import * as MaterialShader from './shaders/material.js';

/**
 * Base class for Materials. The class holds a vertex and a fragment shader
 */
export class Material {
    // 
    #attributes = {};
    #uniforms = {};
    #varyings = {};

    #shader = null;

    static #program = null;

    constructor(shader = MaterialShader) {
        this
            .addUniform("projection", "mat4")
            .addUniform("model", "mat4")
            .addUniform("view", "mat4")
            .addAttribute("position", "vec3");

        this.#shader = shader;
    }


    #preamble(qualifier, dict) {
        const names = Object.keys(dict);

        let str = "";

        names.forEach((name, index) => {
            str += qualifier + " " + dict[name].type + " " + name + ";\n";
        });

        return str;
    }

    /**
     * 
     * @param {*} name 
     * @param {*} type 
     * @returns 
     */
    addAttribute(name, type) {
        this.#attributes["a_" + name] = { type: type };
        return this;
    }

    /**
     * 
     * @param {*} name 
     * @param {*} type 
     * @param {*} val 
     * @returns 
     */
    addUniform(name, type, val = undefined) {
        this.#uniforms["u_" + name] = { type: type, value: val }
        return this;
    }

    /**
     * 
     * @param {*} name 
     * @param {*} type 
     * @returns 
     */
    addVarying(name, type) {
        this.#varyings["v_" + name] = { type: type };
        return this;
    }

    get vertPre() {
        return this.#preamble("uniform", this.#uniforms) + "\n" +
            this.#preamble("in", this.#attributes) + "\n" +
            this.#preamble("out", this.#varyings);
    }

    get fragPre() {
        return this.#preamble("uniform", this.#uniforms) + "\n" +
            this.#preamble("in", this.#varyings) +
            "out vec4 color;\n"
    }

    /**
     * The vertex shader source code. It consists of a preamble with the attribute, uniform and varying declarations,
     * followed by the main function of the shader.
     */
    get vertSource() {
        let src = "#version 300 es\n\n";


        src += this.vertPre;
        src += 'void main() {';
        src += this.vertChunk;
        src += '}\n';

        return src;
    }

    /**
     * The fragment shader source code. IT consists of a preamble with the uniform and varying declarations,
     * followed by the main function of the shader.
     */
    get fragSource() {
        let src = `#version 300 es
        precision mediump float;
        `;
        src += this.fragPre;
        src += 'void main() {';
        src += this.fragChunk;
        src += '}\n';

        return src;
    }

    get vertChunk() {
        return this.#shader.vertex;
    }

    get fragChunk() {
        return this.#shader.fragment;
    }

    get name() {
        return this.#shader.name;
    }

    get uniforms() { return this.#uniforms; }
}


