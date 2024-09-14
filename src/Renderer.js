import { Vector4 } from './math/Vector4.js';
import { Matrix4 } from './math/Matrix4.js';
import { WGLProgram } from './WGLProgram.js';
import { Camera } from './Camera.js';

export class Renderer {
    #background;
    #domElement;
    #gl;
    #clearColor;
    #clearDepth;
    #clearStencil;

    #materialPrograms;

    constructor(options) {
        this.#background = new Vector4(1.0, 0, 0, 1);
        this.#domElement = document.createElement('canvas');
        this.#gl = this.#domElement.getContext('webgl2', options || {});

        this.#materialPrograms = {};

        this.#clearColor = true;
        this.#clearDepth = true;
        this.#clearStencil = false;

        // Set defaults
        this.#gl.enable(this.#gl.DEPTH_TEST);
    }

    get background() { return this.#background; }
    set background(c) { this.#background = c; }

    get clearColor() { return this.#clearColor; }
    set clearColor(v) { this.#clearColor = v; }

    get clearDepth() { return this.#clearDepth; }
    set clearDepth(v) { this.#clearDepth = v; }

    get clearStencil() { return this.#clearStencil; }
    set clearStencil(v) { this.#clearStencil = v; }

    /**
     * Sets the background color
     * 
     * @param {Vector4} v the color for the background
     */
    set background(v) {
        this.#background = v;
    }

    /**
     * Returns the background color
     * @return the background color of the canvas
     */
    get background() {
        return this.#background.copy();
    }

    /**
     * Returns the dom element to which the WebGL Rendering Context it attached
     * @return DOM element associated with the WebGL Rendering Context
     */
    get domElement() { return this.#domElement; }

    /**
     * Sets the size of the DOM element (canvas) to the required size. The viewport is set to fully occupy the canvas
     * @param {*} width the width in pixels for the canvas
     * @param {*} height the height in pixels for the canvas
     */
    setSize(width, height) {
        this.#domElement.width = width;
        this.#domElement.height = height;

        this.#gl.viewport(0, 0, width, height);
    }

    /**
     * @return the current WebGL Rendering Context
     */
    get context() {
        return this.#gl;
    }

    /**
     * 
     * @param {Material} mat - a material for which we want to get the program
     *
     */
    #getProgramForMaterial(mat) {
        const name = mat.name;

        let prog = this.#materialPrograms[name];

        if (!prog) {
            prog = new WGLProgram(this, mat.vertSource, mat.fragSource);
            this.#materialPrograms[name] = prog;
        }

        return prog;
    }

    /**
     * 
     * @param {Scene} scene 
     * @param {Camera} camera 
     */
    render(scene, camera) {
        // Update the transformations of each object in preparation for rendering
        this.#updateScene(scene, camera);

        // Recover the context
        let gl = this.context;

        // Clear the background
        gl.clearColor(this.#background.r, this.#background.g, this.#background.b, this.#background.a);

        let mask = 0;
        gl.clear(this.clearColor ? gl.COLOR_BUFFER_BIT : 0 | this.clearDepth ? gl.DEPTH_BUFFER_BIT : 0 | this.clearStencil ? gl.STENCIL_BUFFER_BIT : 0);

        // Get the camera projection matrix
        const projection = camera.matrix;

        let view = camera.worldToCamera;

        // Walk through each top level mesh
        for (const obj of scene.objects) {
            this.#renderObject(gl, projection, view, obj);
        }
    }

    /**
     * Updates the trasnformations of each object in the scene in peraparation for rendering
     * @param {Scene} scene 
     * @param {Camera} camera 
     */
    #updateScene(scene) {
        for (const obj of scene.objects) {
            obj.update(new Matrix4());
        }
    }

    #cleanupAttribute(gl, attr) {
        //gl.deleteBuffer()
    }

    #renderObject(gl, projection, view, obj) {
        const mat = obj.material;
        const geo = obj.geometry;

        const prog = this.#getProgramForMaterial(mat);

        gl.useProgram(prog.program);

        // Set the camera matrices
        gl.uniformMatrix4fv(prog.uniforms["projection"].location, false, projection.flattened);
        gl.uniformMatrix4fv(prog.uniforms["view"].location, false, view.flattened);
        gl.uniformMatrix4fv(prog.uniforms["model"].location, false, obj.localToWorld.flattened);

        // Need to go through each uniform and set it up
        for (const uName of Object.keys(mat.uniforms)) {
            const uniform = mat.uniforms[uName];
            if (uniform.value) {
                gl.uniform4fv(prog.uniforms[uName].location, uniform.value.v);
            }
        }

        if (geo.vao == null) {
            geo.vao = gl.createVertexArray();
            gl.bindVertexArray(geo.vao);

            // Need to go through each attribute and set it up
            for (const name of Object.keys(geo.attributes)) {
                const attr = geo.attributes[name];

                const index = gl.getAttribLocation(prog.program, name);
                if (index != -1) {

                    if (!attr.buffer) {
                        attr.buffer = gl.createBuffer();
                        gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer);
                        gl.bufferData(gl.ARRAY_BUFFER, attr.array, gl.STATIC_DRAW);
                    }
                    else gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer);

                    gl.vertexAttribPointer(index, attr.itemSize, gl.FLOAT, attr.normalized, 0, 0);
                    gl.enableVertexAttribArray(index);
                }
                else console.log("");
            }

            gl.bindVertexArray(null);

            if (!geo.indices.buffer) {
                geo.indices.buffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geo.indices.buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.indices.array, gl.STATIC_DRAW);
            }
        }

        gl.bindVertexArray(geo.vao);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geo.indices.buffer);
        gl.drawElements(gl.TRIANGLES, geo.indices.count, gl.UNSIGNED_SHORT, 0);

        gl.bindVertexArray(null);

        for (name of Object.keys(geo.attributes)) {
            // Cleanup code
        }

        gl.useProgram(null);

    }
}