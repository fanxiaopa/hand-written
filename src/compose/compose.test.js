const compose = require('./index.js');

function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x + 4;
}

test('should', () => {
    const result1 = compose(fn1, fn2, fn3, fn4)(1);
    const result2 = compose(fn1, fn2, fn3)(2);

    expect(result1).toBe(11);
    expect(result2).toBe(8);
})

