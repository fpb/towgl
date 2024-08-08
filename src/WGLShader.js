export class WGLShader 
{
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {WebGLRenderingContext.VERTEX_SHADER | WebGLRenderingContext.FRAGMENT_SHADER} type 
     * @param {string} src 
     */
    constructor(gl, type, src)
    {
        const shader = gl.createShader(type);

        gl.shaderSource(shader, src);

        gl.compileShader(shader);

        if(gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            this.shader = shader;
        else
            this.shader = undefined;

        this.info = gl.getShaderInfoLog(shader);
    }

    /**
     * Deletes the shader
     * @param {WebGLRenderingContext} gl 
     */
    dispose(gl)
    {
        if(this.shader) gl.deleteShader(this.shader);
    }
};