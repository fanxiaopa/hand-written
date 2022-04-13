/*
 * @Author: yxfan
 * @Date: 2022-04-12 09:36:31
 * @LastEditTime: 2022-04-12 10:01:17
 * @LastEditors: Please set LastEditors
 * @Description: 发布-订阅
 */
/**************************实现*****************************/
class Emitter {
    events = {}
    on(desc, cb) {
        if (this.events[desc]) {
            this.events[desc].push(cb);
        } else {
            this.events[desc] = [cb];
        }
    }

    emit(desc, ...args) {
        const eventsCb = this.events[desc];
        if (eventsCb && eventsCb.length) {
            eventsCb.forEach(e => e.apply(this, args));
        }
    }

    once(desc, cb) {
        this.on(desc, (args) => {
            cb(args);
            this.off(desc);
        });

    }

    off(desc, cbName) {
        if (this.events[desc]) {
            if (!cbName) {
                return delete this.events[desc];
            }
            this.events[desc] = this.events[desc].filter(cb => cb != cbName);
        }
    }
}

/****************************用例***********************/
const emitter = new Emitter();
const handler = (name) => {
    console.log('xixi ' + name);
}
emitter.on('name', (name) => {
    console.log('hello ' + name);
});
emitter.on('name', handler);

emitter.once('once', (desc) => {
    console.log('this is ' + desc);
})
emitter.emit('once', 'once emitter');
// emitter.off('name');
console.log(emitter.events);

emitter.emit('name', 'yxfan');