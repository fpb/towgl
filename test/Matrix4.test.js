import { Matrix4 } from '../src/math/Matrix4.js';

test('constructor given no args should return an identity matrix', () => {
    let m = new Matrix4();
    expect(m.m[0][0]).toBeCloseTo(1);
    expect(m.m[0][1]).toBeCloseTo(0);
    expect(m.m[0][2]).toBeCloseTo(0);
    expect(m.m[0][3]).toBeCloseTo(0);

    expect(m.m[1][0]).toBeCloseTo(0);
    expect(m.m[1][1]).toBeCloseTo(1);
    expect(m.m[1][2]).toBeCloseTo(0);
    expect(m.m[1][3]).toBeCloseTo(0);

    expect(m.m[2][0]).toBeCloseTo(0);
    expect(m.m[2][1]).toBeCloseTo(0);
    expect(m.m[2][2]).toBeCloseTo(1);
    expect(m.m[2][3]).toBeCloseTo(0);

    expect(m.m[3][0]).toBeCloseTo(0);
    expect(m.m[3][1]).toBeCloseTo(0);
    expect(m.m[3][2]).toBeCloseTo(0);
    expect(m.m[3][3]).toBeCloseTo(1);
});

test('constructor given a unidimensional array of size 16 should fill the matrix in row order', () => {
    let m = new Matrix4([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

    expect(m.m[0][0]).toBeCloseTo(0);
    expect(m.m[0][1]).toBeCloseTo(1);
    expect(m.m[0][2]).toBeCloseTo(2);
    expect(m.m[0][3]).toBeCloseTo(3);

    expect(m.m[1][0]).toBeCloseTo(4);
    expect(m.m[1][1]).toBeCloseTo(5);
    expect(m.m[1][2]).toBeCloseTo(6);
    expect(m.m[1][3]).toBeCloseTo(7);

    expect(m.m[2][0]).toBeCloseTo(8);
    expect(m.m[2][1]).toBeCloseTo(9);
    expect(m.m[2][2]).toBeCloseTo(10);
    expect(m.m[2][3]).toBeCloseTo(11);

    expect(m.m[3][0]).toBeCloseTo(12);
    expect(m.m[3][1]).toBeCloseTo(13);
    expect(m.m[3][2]).toBeCloseTo(14);
    expect(m.m[3][3]).toBeCloseTo(15);
});

test('constructor given a bidimensional matrix should make a copy of it', () => {
    let m = new Matrix4([[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]]);

    expect(m.m[0][0]).toBeCloseTo(0);
    expect(m.m[0][1]).toBeCloseTo(1);
    expect(m.m[0][2]).toBeCloseTo(2);
    expect(m.m[0][3]).toBeCloseTo(3);

    expect(m.m[1][0]).toBeCloseTo(4);
    expect(m.m[1][1]).toBeCloseTo(5);
    expect(m.m[1][2]).toBeCloseTo(6);
    expect(m.m[1][3]).toBeCloseTo(7);

    expect(m.m[2][0]).toBeCloseTo(8);
    expect(m.m[2][1]).toBeCloseTo(9);
    expect(m.m[2][2]).toBeCloseTo(10);
    expect(m.m[2][3]).toBeCloseTo(11);

    expect(m.m[3][0]).toBeCloseTo(12);
    expect(m.m[3][1]).toBeCloseTo(13);
    expect(m.m[3][2]).toBeCloseTo(14);
    expect(m.m[3][3]).toBeCloseTo(15);
});

test('constructor given another Matrix4 should create an identical object', () => {
    let n = new Matrix4([[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]]);
    let m = new Matrix4(n);

    expect(m.m[0][0]).toBeCloseTo(0);
    expect(m.m[0][1]).toBeCloseTo(1);
    expect(m.m[0][2]).toBeCloseTo(2);
    expect(m.m[0][3]).toBeCloseTo(3);

    expect(m.m[1][0]).toBeCloseTo(4);
    expect(m.m[1][1]).toBeCloseTo(5);
    expect(m.m[1][2]).toBeCloseTo(6);
    expect(m.m[1][3]).toBeCloseTo(7);

    expect(m.m[2][0]).toBeCloseTo(8);
    expect(m.m[2][1]).toBeCloseTo(9);
    expect(m.m[2][2]).toBeCloseTo(10);
    expect(m.m[2][3]).toBeCloseTo(11);

    expect(m.m[3][0]).toBeCloseTo(12);
    expect(m.m[3][1]).toBeCloseTo(13);
    expect(m.m[3][2]).toBeCloseTo(14);
    expect(m.m[3][3]).toBeCloseTo(15);
});

test('diag should return the matrix diagonal', () => {
    let m = new Matrix4([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

    let d = m.diag;

    expect(d[0]).toBeCloseTo(0);
    expect(d[1]).toBeCloseTo(5);
    expect(d[2]).toBeCloseTo(10);
    expect(d[3]).toBeCloseTo(15);
});

test('add works fine', () => {
    let m1 = new Matrix4(); m1.randomize();
    let m2 = new Matrix4(); m2.randomize();

    let m3 = Matrix4.add(m1, m2);

    expect(m3.m[0][0]).toBe(m1.m[0][0] + m2.m[0][0]);
    expect(m3.m[0][1]).toBe(m1.m[0][1] + m2.m[0][1]);
    expect(m3.m[0][2]).toBe(m1.m[0][2] + m2.m[0][2]);
    expect(m3.m[0][3]).toBe(m1.m[0][3] + m2.m[0][3]);
    expect(m3.m[1][0]).toBe(m1.m[1][0] + m2.m[1][0]);
    expect(m3.m[1][1]).toBe(m1.m[1][1] + m2.m[1][1]);
    expect(m3.m[1][2]).toBe(m1.m[1][2] + m2.m[1][2]);
    expect(m3.m[1][3]).toBe(m1.m[1][3] + m2.m[1][3]);
    expect(m3.m[2][0]).toBe(m1.m[2][0] + m2.m[2][0]);
    expect(m3.m[2][1]).toBe(m1.m[2][1] + m2.m[2][1]);
    expect(m3.m[2][2]).toBe(m1.m[2][2] + m2.m[2][2]);
    expect(m3.m[2][3]).toBe(m1.m[2][3] + m2.m[2][3]);
    expect(m3.m[3][0]).toBe(m1.m[3][0] + m2.m[3][0]);
    expect(m3.m[3][1]).toBe(m1.m[3][1] + m2.m[3][1]);
    expect(m3.m[3][2]).toBe(m1.m[3][2] + m2.m[3][2]);
    expect(m3.m[3][3]).toBe(m1.m[3][3] + m2.m[3][3]);

});

test('sub works fine', () => {
    let m1 = new Matrix4(); m1.randomize();
    let m2 = new Matrix4(); m2.randomize();

    let m3 = Matrix4.sub(m1, m2);

    expect(m3.m[0][0]).toBe(m1.m[0][0] - m2.m[0][0]);
    expect(m3.m[0][1]).toBe(m1.m[0][1] - m2.m[0][1]);
    expect(m3.m[0][2]).toBe(m1.m[0][2] - m2.m[0][2]);
    expect(m3.m[0][3]).toBe(m1.m[0][3] - m2.m[0][3]);
    expect(m3.m[1][0]).toBe(m1.m[1][0] - m2.m[1][0]);
    expect(m3.m[1][1]).toBe(m1.m[1][1] - m2.m[1][1]);
    expect(m3.m[1][2]).toBe(m1.m[1][2] - m2.m[1][2]);
    expect(m3.m[1][3]).toBe(m1.m[1][3] - m2.m[1][3]);
    expect(m3.m[2][0]).toBe(m1.m[2][0] - m2.m[2][0]);
    expect(m3.m[2][1]).toBe(m1.m[2][1] - m2.m[2][1]);
    expect(m3.m[2][2]).toBe(m1.m[2][2] - m2.m[2][2]);
    expect(m3.m[2][3]).toBe(m1.m[2][3] - m2.m[2][3]);
    expect(m3.m[3][0]).toBe(m1.m[3][0] - m2.m[3][0]);
    expect(m3.m[3][1]).toBe(m1.m[3][1] - m2.m[3][1]);
    expect(m3.m[3][2]).toBe(m1.m[3][2] - m2.m[3][2]);
    expect(m3.m[3][3]).toBe(m1.m[3][3] - m2.m[3][3]);
});

test('scale returns a scaling matrix given its 4 parameters', () => {
    let m = Matrix4.scale(1,2,3,4);
});

test('scale returns a scaling matrix given its 3 parameters', () => {
    let m = Matrix4.scale(1,2,3);
});

test('translation returns a translation matrix', () => {
    let m = Matrix4.translation(1,2,3,4);
    expect(m.m[0][3]).toBe(1);
});