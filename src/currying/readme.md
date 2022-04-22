### 函数柯里化

> 柯里化（currying）指的是将一个多参数的函数拆分成一系列函数，每个拆分后的函数都只接受一个参数（unary）。
比如：add(1)(2)(3)

#### 实现`add(1)(2)(3) === 6` `add(1)(2)(3)(4) === 10`

分析：每次都返回一个函数，并将调用时的入参通过必包的形式保存起来

```js
function add() {
    const _args = [...arguments];
    // 注意这里不能用箭头函数，不然arguments错误
    function fn() {
        _args.push(...arguments);
        return fn;
    }
    // 这里用toString也可
    fn.valueOf = () => _args.reduce((pre, cur) => pre + cur);
    return fn;
}
add(1)(2)(3) + '' // 6
add(1)(2)(3)(4) + '' // 10
```
这里用了`valueOf`方法，利用了隐式转换时，会自动调用`valueOf`, `toString`的特性

#### 实现函数柯里化

下例实现了一个专门用于将函数柯里化的一个函数，通过`fn.length`获得目标函数的入参个数，和调用时的入参比较，如果相等，则直接将参数给`fn`。反之，继续搜集入参

```js
function currying(fn, ...args) {
    // 获得fn的入参个数
    const paramsLength = fn.length;
    let allArgs = [...args];
    const curryFn = (...curryArgs) => {
        allArgs = [...allArgs, ...curryArgs];
        if (allArgs.length === paramsLength) {
            return fn(...allArgs);
        }
        return curryFn;
    }
    return curryFn;
}

const add = (a, b, c) => a + b + c;
const a = currying(add);
a(1,2)(3)  // 6
```