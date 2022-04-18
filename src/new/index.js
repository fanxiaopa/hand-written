/*
 * @Author: yxfan
 * @Date: 2022-04-18 09:38:27
 * @LastEditTime: 2022-04-18 11:29:30
 * @Description: 实现new操作符
 *  1、检测 new 的目标是不是非函数，如果是非函数，抛出错误
    2、修改 new 的 target 属性，使之指向构造函数
    3、新建一个空的实例对象。注意不能使用 Object.create 创建，否则当构造函数原型为 null 的时候，实例对象隐式原型也为 null，但根据 new 的规范，这里不是这样的。具体见 4。
    4、检测构造函数原型是否为 null，如果不是，则将其作为实例对象的隐式原型，否则将 Object 的原型作为实例对象的隐式原型
    5、执行构造函数，将其 this 指向实例对象，同时传入参数
    6、获得构造函数返回值，判断是不是对象，如果是对象，则作为 new 的返回值，否则将实例对象作为 new 的返回值
 */
function myNew(Fn, ...args) {
    // 检测异常
    if (typeof Fn !== 'function') {
        throw new TypeError(Fn + 'is not a constructor')
    }
    const instance = {};
    // 修改 new 的 target 属性，使之指向构造函数
    myNew.target = Fn;
    instance.__proto__ = typeof Fn.prototype === 'object'
        ? Fn.prototype
        : Object.prototype;
    
    const returnValue = Fn.apply(instance, args);
    return typeof returnValue === 'object' ? returnValue : instance;
}
function Persion(name, age) {
    this.name = name;
    this.age = age;
}
Persion.prototype.say = function () {
    console.log(this.age, this.name);
}
let p1 = myNew(Persion, 'yxfan', 22);
// console.log(p1.name, p1.age);
p1.say();
