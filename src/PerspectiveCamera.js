import { Camera } from './Camera.js';

import { toRadians } from './math/Utils.js';

export class PerspectiveCamera extends Camera {
    constructor(fovy=90, aspect=2, near=0.1, far=100) {

        super();

        const f = 1/Math.tan(toRadians(fovy/2));
        const n_f = near - far;

        this.matrix.m [0][0] = f/aspect;   this.matrix.m[0][1] = 0;               this.matrix.m[0][2] = 0;                this.matrix.m[0][3] = 0;
        this.matrix.m [1][0] = 0;          this.matrix.m[1][1] = f;               this.matrix.m[1][2] = 0;                this.matrix.m[1][3] = 0;
        this.matrix.m [2][0] = 0;          this.matrix.m[2][1] = (far+near)/n_f;  this.matrix.m[2][2] = 2*far*near/n_f;   this.matrix.m[2][3] = 0;
        this.matrix.m [3][0] = 0;          this.matrix.m[3][1] = 0.0;             this.matrix.m[3][2] = -1;               this.matrix.m[3][3] = 0;
    }

}