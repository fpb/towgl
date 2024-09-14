import { Material } from "../Material.js";

import * as NormalMaterialShader from '../shaders/normal_material.js';

/**
 * Class for materials that paint objects with color derived from normals
 * @extends Material
 */

export class NormalMaterial extends Material {
    constructor() {
        super(NormalMaterialShader);

        this.addAttribute("normal", "vec3");
        this.addVarying("normal", "vec3");
    }
}

