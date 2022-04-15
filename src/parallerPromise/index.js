/*
 * @Author: yxfan
 * @Date: 2022-04-15 09:01:54
 * @LastEditTime: 2022-04-15 09:30:33
 * @LastEditors: Please set LastEditors
 * @Description: 并行的Promise
 */

class Scheduler {

    constructor(limit) {
        this.maxCount = limit;
        this.queue = [];
        this.runCounts = 0;
    }

    add(time, order) {
        const promiseCreater = () => new Promise(resolve => {
            setTimeout(() => {
                console.log(order);
                resolve();
            }, time);
        })
        this.queue.push(promiseCreater);
    }
    taskStart() {
        for (let i = 0; i < this.maxCount; i++) {
            this.request();
        }
    }
    request() {
        if (!this.queue.length || this.runCounts > this.maxCount) {
            return;
        }
        this.runCounts++;
        this.queue.shift()().then(() => {
            this.runCounts--;
            this.request();
        });
    }
}

// 并行两个
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
    scheduler.add(time, order);
};

//  的输出顺序是：2 3 1 4

//  整个的完整执行流程：

// 一开始1、2两个任务开始执行
// 500ms时，2任务执行完毕，输出2，任务3开始执行
// 800ms时，3任务执行完毕，输出3，任务4开始执行
// 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 1200ms时，4任务执行完毕，输出4


addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();

