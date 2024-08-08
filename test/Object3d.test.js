import { Object3D } from '../src/Object3D.js' ;
import { Vector3 } from '../src/math/Vector3.js';
import { Matrix4 } from '../src/math/Matrix4.js';

test('Creating an empty object 3d should set parent to null', () => {
    let o = new Object3D();
    expect(o.parent).toEqual(null);
});

test('Creating an empty object 3d should set children to empty list', () => {
    let o = new Object3D();
    expect(o.children).toEqual([]);
});

test('Creating an empty object 3d should have an identity transform', () => {
    let o = new Object3D();
    expect(o.transform).toEqual(new Matrix4());
});

test('Single translation of a 3d object should work', () => {
    let o = new Object3D();
    o.position = new Vector3(10, 20, 30);
    expect(o.transform.m).toEqual(Matrix4.translation(10,20,30).m);
});

test('Single rotation around X of a 3d object should work', () => {
    let o = new Object3D();
    o.rotX = 30;
    expect(o.transform.m).toEqual(Matrix4.rotationX(30).m);
});

test('Single rotation around Y of a 3d object should work', () => {
    let o = new Object3D();
    o.rotY += -30;
    expect(o.transform.m).toEqual(Matrix4.rotationY(-30).m);
});

test('Single rotation around Z of a 3d object should work', () => {
    let o = new Object3D();
    o.rotZ = 245;
    expect(o.transform.m).toEqual(Matrix4.rotationZ(245).m);
});
