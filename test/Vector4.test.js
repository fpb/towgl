import { Vector4 } from '../src/math/Vector4.js' ;

test('constructor should create a zero vector with 1 in the last component', () => { 
    const v = new Vector4(); 
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
    expect(v.w).toBe(1);
});

test('length of Vector4(10, 20, 0, 30', () => {
    const v = new Vector4(10, 20, 0, 30);
    expect(v.length).toBe(Math.sqrt(10*10+20*20+30*30))
});

test('length of Vector4(10, 0, 20, 30', () => {
    const v = new Vector4(10, 0, 20, 30);
    expect(v.length).toBe(Math.sqrt(10*10+20*20+30*30))
});

test('normalize Vector4(3, 4, 7, 1) should return a vector of length 1', () => {
    const v = new Vector4(3,4,7,1);
    v.normalize();
    expect(v.length).toBeCloseTo(1);
});

test('x getter and r getters return the same', () => {
    const x = 5, y = 2, z = 1, w = 4;
    const v = new Vector4(x, y, z, w);
    expect(v.r).toBe(x); expect(v.r).toBe(v.x);
});

test('y getter and g getters return the same', () => {
    const x = 5, y = 2, z = 1, w = 4;
    const v = new Vector4(x, y, z, w);
    expect(v.y).toBe(y); expect(v.g).toBe(v.y);
});

test('z getter and b getters return the same', () => {
    const x = 5, y = 2, z = 1, w = 4;
    const v = new Vector4(x, y, z, w);
    expect(v.z).toBe(z); expect(v.b).toBe(v.z);
});

test('w getter and a getters return the same', () => {
    const x = 5, y = 2, z = 1, w = 4;
    const v = new Vector4(x, y, z, w);
    expect(v.w).toBe(w); expect(v.a).toBe(v.w);
});


test('x setter works', () => {
    const x = 5, y = 2, z = 1, w = 4, newX = 10;
    const v = new Vector4(x, y, z, w);
    v.x = newX;
    expect(v.x).toBe(newX);
});

test('y setter works', () => {
    const x = 5, y = 2, z = 1, w = 4, newY = 10;
    const v = new Vector4(x, y, z, w);
    v.y = newY;
    expect(v.y).toBe(newY);
});

test('z setter works', () => {
    const x = 5, y = 2, z = 1, w = 4, newZ = 10;
    const v = new Vector4(x, y, z, w);
    v.z = newZ;
    expect(v.z).toBe(newZ);
});

test('w setter works', () => {
    const x = 5, y = 2, z = 1, w = 4, newW = 10;
    const v = new Vector4(x, y, z, w);
    v.w = newW;
    expect(v.w).toBe(newW);
});


test('clear sets the vector to the null vector', () => {
    const x = 5, y = 2, z = 1, w = 4;
    const v = new Vector4(x, y, z, w);

    v.clear();

    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
    expect(v.w).toBe(0);
});

test('static add works', () => {
    let a = new Vector4(); a.randomize();
    let b = new Vector4(); b.randomize();

    let c = Vector4.add(a,b);

    expect(c.x).toBe(a.x + b.x);
    expect(c.y).toBe(a.y + b.y);
    expect(c.z).toBe(a.z + b.z);
    expect(c.w).toBe(a.w + b.w);
});

test('add works', () => {
    let a = new Vector4(); a.randomize();
    let b = new Vector4(); b.randomize();

    let c = Vector4.add(a,b);
    a.add(b);

    expect(c.x).toBe(a.x);
    expect(c.y).toBe(a.y);
    expect(c.z).toBe(a.z);
    expect(c.w).toBe(a.w);

});

test('static subtract works', () => {
    let a = new Vector4(); a.randomize();
    let b = new Vector4(); b.randomize();

    let c = Vector4.sub(a,b);

    expect(c.x).toBe(a.x - b.x);
    expect(c.y).toBe(a.y - b.y);
    expect(c.z).toBe(a.z - b.z);
    expect(c.w).toBe(a.w - b.w);
});

test('sub works', () => {
    let a = new Vector4(); a.randomize();
    let b = new Vector4(); b.randomize();

    let c = Vector4.sub(a,b);
    a.sub(b);

    expect(c.x).toBe(a.x);
    expect(c.y).toBe(a.y);
    expect(c.z).toBe(a.z);
    expect(c.w).toBe(a.w);

});