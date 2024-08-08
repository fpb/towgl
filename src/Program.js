export class Program 
{
    #program;

    constructor(gl, vertSrc, fragSrc) 
    {
        this.#program = this.buildFromShaderSources(gl, vertSrc, fragSrc);
    }

    buildFromShaderSources(gl, vertSrc, fragSrc) 
    {
        let vertShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertShader, vertSrc);
        gl.compileShader(vertShader);
        if(!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
            let msg = `Vertex shader failed to compile. The error log is:<pre>${gl.getShaderInfoLog(vertShader)}</pre>`;
            alert(msg);
        }

        let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragShader, fragSrc);
        gl.compileShader(fragShader);
        if(!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
            let msg = `Fragment shader failed to compile. The error log is:<pre>${gl.getShaderInfoLog(fragShader)}</pre>`;
            alert(msg);
        }

        let program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            let msg = `Shader program failed to link. The error log is:<pre>${gl.getProgramInfoLog(program)}</pre>`;
            return undefined;
        }

        return program;
    }

    use(gl)
    {
        gl.useProgram(this.#program);
    }

    setUniforms(gl, uniforms) 
    {

    }

    setAttributes(gl, attributes)
    {

    }
}