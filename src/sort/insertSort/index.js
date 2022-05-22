/*
 * @Author: yxfan
 * @Date: 2022-05-05 14:52:26
 * @LastEditors: yxfan yxfan@streamax.com
 * @LastEditTime: 2022-05-05 18:10:19
 * @description: 插入排序
 */
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let preIndex = i - 1;
        const current = arr[i];

        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

const result = insertSort([3, 2, 1]);
console.log(result);