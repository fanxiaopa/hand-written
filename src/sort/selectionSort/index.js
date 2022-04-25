/*
 * @Author: yxfan
 * @Date: 2022-04-25 11:47:10
 * @LastEditTime: 2022-04-25 11:50:41
 * @Description: 选择排序
 */
function selectionSort(arr) {
    const arrLen = arr.length;
    for (let i = 0; i < arrLen - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arrLen; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}
console.log(selectionSort([3, 6, 2, 4, 1]));
