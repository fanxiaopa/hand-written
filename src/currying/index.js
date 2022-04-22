/*
 * @Author: yxfan
 * @Date: 2022-04-22 09:19:07
 * @LastEditTime: 2022-04-22 10:26:29
 * @LastEditors: Please set LastEditors
 * @Description: 函数柯里化
 */
function currying(fn, ...args) {
    const paramsLength = fn.length;
    let allArgs = args;
    const curryFn = (...curryArgs) => {
        allArgs = [...allArgs, ...curryArgs];
        if (allArgs.length === paramsLength) {
            return fn(...allArgs);
        }
        return curryFn;
    }
    return curryFn;
}

// 用法如下：
// const add = (a, b, c) => a + b + c;
// const a = currying(add);
// console.log(a(1,2)(3))


function add() {
    const _args = [...arguments];
  
    function curryFn() {
        _args.push(...arguments);
        return curryFn;
    }
    curryFn.toString = () => _args.reduce((pre, cur) => pre + cur);
    return curryFn;
}
const res = add(1)(2, 3);
console.log(res + '');