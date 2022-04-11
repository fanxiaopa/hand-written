/*
 * @Author: yxfan
 * @Date: 2022-04-10 08:42:35
 * @LastEditTime: 2022-04-11 16:07:24
 * @LastEditors: Please set LastEditors
 * @Description: settimeout 模拟实现 setinterval(带清除定时器的版本)
 * setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗
 */


/**********************************实现**************************** */
function mySetTimeout(fn, t) {

    let timer;
    function interval() {
        timer = setTimeout(() => {
            fn();
            interval();
        }, t);
    }
    interval();
    return {
        cancel: () => {
            clearTimeout(timer);
        }
    }
}

/**********************************用例***************************** */
const t = mySetTimeout(() => {
    console.log('XXXXXX');
}, 1000);

setTimeout(() => {
    t.cancel();
}, 3000);

module.exports = mySetTimeout;

// 这里再来个setInterval模拟setTimeout
function mySetInterval(fn, t) {
    const timer = setInterval(() => {
        fn();
        clearInterval(timer);
    }, t);
    return {
        cancel: () => clearInterval(timer)
    }
}