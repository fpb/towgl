import { Material } from '../src/Material.js';

test('creating a base material should return an empty vertex shader preamble', () => {
    let m = new Material();

    expect(m.vertPre).toContain("attribute vec3 position;");
});
/*
test('inspecting the default vertex shader', () => {
    let m = new Material();

    expect(m.vert).toContain('gibberish');
});

test('inspecting the default fragment shader', () => {
    let m = new Material();

    expect(m.frag).toContain('gibberish');
    
});
*/