/*
 * @Author: yxfan
 * @Date: 2022-04-21 14:11:36
 * @LastEditTime: 2022-04-21 14:44:02
 * @LastEditors: Please set LastEditors
 * @Description: 实现instanceof
 */

function myInstanceOf(instance, target) {
    while (true) {
        if (instance === null) {
            return false;
          }
        if (instance.__proto__ === target.prototype) {
            return true;
        }
        instance = instance.__proto__;
    }
}

class Base {
    name = 'yxfan'
}

class Test extends Base {
    age = 22
}

const one = new Test();
console.log(myInstanceOf(one, Base));
