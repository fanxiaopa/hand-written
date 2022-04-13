/*
 * @Author: yxfan
 * @Date: 2022-04-13 09:40:55
 * @LastEditTime: 2022-04-13 10:20:05
 * @LastEditors: Please set LastEditors
 * @Description: 多维数组扁平化
 */

/****************************实现**************** */
function flatten(array) {
    // 深度优先
    // return array.reduce((pre, next) => {
    //     return pre.concat(
    //         Array.isArray(next) ? flatten(next) : next
    //     );
    // }, []);
    // 广度优先
    while(true) {
        if (array.some(a => Array.isArray(a))) {
            let targetIndex = array.findIndex(a => Array.isArray(a));
            array[targetIndex].forEach(item => array.push(item));
            array[targetIndex] = undefined;
        } else {
            break;
        }
    }
    return array.filter(a => a);
}

/****************************用例***************** */
const arr = [1, [2, [3, [4, [5]]]]];

console.log(flatten(arr));