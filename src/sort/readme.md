<!--
 * @Author: your name
 * @Date: 2022-04-25 11:51:55
 * @LastEditTime: 2022-05-05 18:26:46
 * @LastEditors: yxfan yxfan@streamax.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hand-written/src/sort/readme.md
-->
### 冒泡排序

冒泡排序（Bubble Sort）也是一种简单直观的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成

#### 原理

- 比较相邻的两个元素，如果第一个比第二个大，就交换他们两个
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数
- 针对所有的元素重复以上的步骤，除了最后一个。

 ```js
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

bubbleSort([3, 6, 2, 4, 1]); // [ 1, 2, 3, 4, 6 ] 
 ```
#### 动图
![image](https://www.runoob.com/wp-content/uploads/2019/03/bubbleSort.gif)

### 选择排序

选择排序是一种简单直观的排序算法，无论什么数据进去都是 O(n²) 的时间复杂度。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间

#### 原理
- 遍历整个序列，找出最小(大)的元素，放到起始位置
- 继续遍历，把找到的元素放在本次遍历的起始位置

```js
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
selectionSort([3, 6, 2, 4, 1]); // [ 1, 2, 3, 4, 6 ]
```
##### 动图
![image](https://www.runoob.com/wp-content/uploads/2019/03/selectionSort.gif)

### 插入排序

![image](https://www.runoob.com/wp-content/uploads/2019/03/insertionSort.gif)
