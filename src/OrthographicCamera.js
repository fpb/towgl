import { Camera } from './Camera.js';

import { toRadians } from './math/Utils.js';

export class OrthographicCamera extends Camera {
    constructor(left = -1, right = 1, bottom = -1, top = 1, near = -1, far = 1) {

        super();

        const r_l = right - left;
        const t_b = top - bottom;
        const n_f = near - far;

        const t_x = - (right + left) / r_l;
        const t_y = - (top + bottom) / t_b;
        const t_z = (far + near) / n_f;

        this.matrix.m[0][0] = 2 / r_l; this.matrix.m[0][1] = 0; this.matrix.m[0][2] = 0; this.matrix.m[0][3] = t_x;
        this.matrix.m[1][0] = 0; this.matrix.m[1][1] = 2 / t_b; this.matrix.m[1][2] = 0; this.matrix.m[1][3] = t_y;
        this.matrix.m[2][0] = 0; this.matrix.m[2][1] = 0; this.matrix.m[2][2] = 2 / n_f; this.matrix.m[2][3] = t_z;
        this.matrix.m[3][0] = 0; this.matrix.m[3][1] = 0.0; this.matrix.m[3][2] = 0; this.matrix.m[3][3] = 1;
    }

}