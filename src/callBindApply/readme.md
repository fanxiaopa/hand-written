<!--
 * @Author: your name
 * @Date: 2022-04-19 11:33:32
 * @LastEditTime: 2022-04-19 11:51:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hand-written/src/callBindApply/readme.md
-->
### call实现

主要是考虑this指向问题

先看一下这个问题
```js
const obj = {
    name: 'yxfan',
    fn: function() {
        console.log(this.name);
    }
};
obj.fn();
```
上述例子可以可以看出「this」已经指向了目标对象，因此实现「call」的关键一步就是将「function」放入「this」目标对象中

```js
Function.prototype.myCall = function(context, ...args) {
    if (!context || context === null) {
        context = window;
    }
    context.fn = this;
    context.fn(...args);
    delete context.fn;
}

let obj = { name: 'yxfan' };
function callTest(age) {
    console.log(this.name, age);
}
callTest.myCall(obj, 22);
```
注意千万不能用箭头函数，会改变this指向！

### bind实现
bind实现较复杂，有两种情况
- 直接调用返回的函数
- 将返回的函数作为构造函数，实现new操作

```js
Function.prototype.myBind = function(context, ...args) {
    if (!context || context === null) {
        context = window;
    }
    context.fn = this;
    const that = this; // bar
    const result = function(...innerArgs) {
        if (this instanceof that) {
            // 作为 new使用
            this.fn = that;
            this.fn(...args, ...innerArgs);
            delete this.fn;
        } else {
            context.fn(...args, ...innerArgs);
            delete context.fn;
        }
    }
    result.prototype = Object.create(this.prototype);
    return result;
}
```

```js
var value = 2;
var foo = { value: 1 };
function bar(name, age) {
    this.habit = 'sporting';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'yxfan';
var bindFoo = bar.myBind(foo, 'daisy');
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit); // sporting
console.log(obj.friend); // yxfan
```