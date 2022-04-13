/*
 * @Author: yxfan
 * @Date: 2022-04-13 09:21:31
 * @LastEditTime: 2022-04-13 09:39:08
 * @LastEditors: Please set LastEditors
 * @Description: 数组去重
 */

/*******************************实现************************ */
function unique(arr, unqiueBy) {
    if (unqiueBy) {
        const obj = {};
        arr = arr.reduce((pre, next) => {
            obj[next[unqiueBy]] ? '' : obj[next[unqiueBy]] = true && pre.push(next);
            return pre;
        }, []);        
        return arr;
    } 
    return [...new Set(arr)];
}

/*******************************用例************************ */
const arr = [1, 1, 2, 3, 3, 3, 4, undefined, undefined, null, null, NaN, NaN];
const arrObj = [{ name: 'yxfan', age: '18' }, { name: 'yxfan', age: '20' }, { name: 'cheney', age: '22' }];
console.log(unique(arr));
console.log(unique(arrObj, 'name'));
