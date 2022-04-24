/*
 * @Author: yxfan
 * @Date: 2022-04-24 18:09:32
 * @LastEditTime: 2022-04-24 18:13:00
 * @LastEditors: Please set LastEditors
 * @Description: 冒泡排序
 */
function bubbleSort(arr) {
    const arrLeng = arr.length;
    for (let i = 0; i < arrLeng; i++) {
        for(let j = i + 1; j < arrLeng; j++) {
            if (arr[i] > arr[j]) {
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([3, 6, 2, 4, 1]));