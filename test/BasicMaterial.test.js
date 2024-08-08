import { BasicMaterial } from '../src/Materials/BasicMaterial.js';

describe('BasicMaterial', () => {
    test('expect material to have a single uniform named color', () => {
        let bm = new BasicMaterial();

        expect(bm.vertPre).toContain("uniform vec4 color;");
    });

    /*
    test('inspecting the vertex shader', () => {
        let m = new BasicMaterial();

        expect(m.vert).toContain('gibberish');
    });

    test('inspecting the fragment shader', () => {
        let m = new BasicMaterial();

        expect(m.frag).toContain('gibberish');
    });
    */
})