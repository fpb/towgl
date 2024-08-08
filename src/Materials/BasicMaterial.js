import { Vector4 } from '../math/Vector4.js' ;
import { Material } from '../Material.js' ;

import * as BasicMaterialShader from '../shaders/basic_material.js';

/**
 * Class representing a single color material
 * @extends Material
 */
export class BasicMaterial extends Material 
{
    #color;

    constructor(params)
    {
        super(BasicMaterialShader);
     
        params = params || {};
        
        this.#color = params.color || new Vector4(1,1,1,1);

        this.addUniform("color", "vec4", this.#color);
    }
}