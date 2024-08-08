import { Vector3 } from '../src/math/Vector3.js' ;

test('constructor should create a zero vector', () => { 
    const v = new Vector3(); 
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
});

test('copy should set the components of a vector from a given one', () => {
    const a = new Vector3(1, 2, 3);
    const b = new Vector3(4, 5, 6);

    a.copy(b);

    expect(a.v).toEqual(b.v);
});

test('clone should return a clone of the vector', () => {
    const a = new Vector3(1, 2, 3);
    const b = a.clone();

    // The vectors should contain the same values
    expect(a.v).toEqual(b.v);
    // but the arrays that store the elements should be different
    b.x = 10;
    expect(a.v).not.toEqual(b.v);
});

test('norm of Vector3(10,20,30', () => {
    const v = new Vector3(10, 20, 30);
    expect(v.length).toBe(Math.sqrt(10*10+20*20+30*30));
});

test('normalize Vector3(3, 4, 0) should return a vector of length 1', () => {
    const v = new Vector3(3,4,0);
    v.normalize();
    expect(v.length).toBeCloseTo(1);
});

test('x getter and r getters return the same', () => {
    const x = 5, y = 2, z = 1;
    const v = new Vector3(x, y, z);
    expect(v.r).toBe(x); expect(v.r).toBe(v.x);
});

test('y getter and g getters return the same', () => {
    const x = 5, y = 2, z = 1;
    const v = new Vector3(x, y, z);
    expect(v.y).toBe(y); expect(v.g).toBe(v.y);
});

test('z getter and b getters return the same', () => {
    const x = 5, y = 2, z = 1;
    const v = new Vector3(x, y, z);
    expect(v.z).toBe(z); expect(v.b).toBe(v.z);
});

test('x setter works', () => {
    const x = 5, y = 2, z = 1, newX = 10;
    const v = new Vector3(x, y, z);
    v.x = newX;
    expect(v.x).toBe(newX);
});

test('y setter works', () => {
    const x = 5, y = 2, z = 1, newY = 10;
    const v = new Vector3(x, y, z);
    v.y = newY;
    expect(v.y).toBe(newY);
});

test('z setter works', () => {
    const x = 5, y = 2, z = 1, newZ = 10;
    const v = new Vector3(x, y, z);
    v.z = newZ;
    expect(v.z).toBe(newZ);
});

test('v getter returns an equivalent array', () => {
    const x=2, y=3, z=-1;
    const v = new Vector3(x,y,z);

    expect(v.v).toEqual([x,y,z]);
});

test('v getter does not return an internal reference', () => {
    const x=2, y=3, z=-1;
    // Build a Vector3
    const v = new Vector3(x,y,z);
    // Get a copy of the internal array
    let vv = v.v;
    // Change the contents of the copy
    vv[0] = 10; vv[1] = 20; vv[2] = 30;
    // Check to see if a new copy will still return the original values
    expect(v.v).toEqual([x,y,z]);
});

test('clear sets the vector to the null vector', () => {
    const x = 5, y = 2, z = 1;
    const v = new Vector3(x, y, z);

    v.clear();

    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
});

