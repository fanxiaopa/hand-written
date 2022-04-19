/*
 * @Author: your name
 * @Date: 2022-04-19 09:37:41
 * @LastEditTime: 2022-04-19 11:33:03
 * @LastEditors: Please set LastEditors
 * @Description: 实现call apply bind
 */

/******************************* call实现****************************** */
Function.prototype.myCall = function(context, ...args) {
    if (!context || context === null) {
        context = window;
    }
    context.fn = this;
    context.fn(...args);
    delete context.fn;
}

// let obj = { name: 'yxfan' };
// function callTest(age) {
//     console.log(this.name, age);
// }
// callTest.myCall(obj, 22);


/******************************* bind实现****************************** */
Function.prototype.myBind = function(context, ...args) {
    if (!context || context === null) {
        context = window;
    }
    context.fn = this;
    const that = this; // bar
    const result = function(...innerArgs) {
        // obj
        if (this instanceof that) {
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

var value = 2;
var foo = { value: 1 };

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';
var bindFoo = bar.myBind(foo, 'daisy');
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);


