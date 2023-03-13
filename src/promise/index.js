// 定义三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {
	_status = PENDING;
	FULFILLED_CB_LIST = [];
	REJECTED_CB_LIST = [];

	get status() {
		return this._status;
	}
	
	set status(newStatus) {
		this._status = newStatus;
		switch (newStatus) {
			case FULFILLED:
				this.FULFILLED_CB_LIST.forEach((cb) => cb(this.value));
				break;
			case REJECTED:
				this.REJECTED_CB_LIST.forEach((cb) => cb(this.reason));
				break;
		}
	}
	constructor(fn) {
		this.status = PENDING;
		this.value = null;
		this.reason = null;

		try {
			fn(this.resolve.bind(this), this.reject.bind(this));
		} catch (err) {
			this.reject(err);
		}
	}

	resolve(value) {
		if (this.status === PENDING) {
			this.value = value;
			this.status = FULFILLED;
		}
	}

	reject(reason) {
		if (this.status === PENDING) {
			this.reason = reason;
			this.status = REJECTED;
		}
	}

	then(onFulfilled, onRejected) {
		const onRealFulFilled = this._isFunction(onFulfilled)
			? onFulfilled
			: (value) => value;
		const onRealRejected = this._isFunction(onRejected)
			? onRejected
			: (reason) => { throw reason}

		const promise2 = new MPromise((resolve, reject) => {

			const fulFilledMicrotask = () => {
				queueMicrotask(() => {
					try {
						const x = onRealFulFilled(this.value);
						this.resolvePromise(promise2, x, resolve, reject);
					} catch (err) {
						reject(err);
					}
				})
				
			}
			const rejectionMicrotask = () => {
				queueMicrotask(() => {
					try {
						const x = onRealRejected(this.reason);
						this.resolvePromise(promise2, x, resolve, reject);
					} catch (err) {
						reject(err);
					}
				});
			}
			switch(this.status) {
				case FULFILLED:
					fulFilledMicrotask();
					break;
				case REJECTED:
					rejectionMicrotask();
					break;
				case PENDING:
					this.FULFILLED_CB_LIST.push(fulFilledMicrotask);
					this.REJECTED_CB_LIST.push(rejectionMicrotask);

			}
		});
		return promise2;
	}

	resolvePromise(promise2, x, resolve, reject) {
		// 如果promise2和x相等，抛一个error，防止死循环
		if (promise2 === x) {
			return reject(new TypeError('The Promise and the return value are same'))
		}

		if (x instanceof MPromise) {
			queueMicrotask(() => {
				x.then(y => {
					this.resolvePromise(promise2, y, resolve, reject);
				}, reject);
			});
		} else if (typeof x == 'object' || this._isFunction(x)) {
			if (x === null) {
				return resolve(x);
			}

			let then = null;
			try {
				then = x.then;
			} catch (err) {
				return reject(err);
			}

			if (this._isFunction(then)) {
				let called = false;
				try {
					then.call(x, y => {
						if (called) return;
						called = true;
						this.resolvePromise(promise2, y, resolve, reject);
					}, r => {
						if (called) return;
						called = true;
						reject(r);
					});
				} catch (err) {
					if (called) return;
					reject(err);
				}
			} else {
				resolve(x);
			}
		} else {
			resolve(x);
		}
	}

	catch(onRejected) {
		this.then(null, onRejected);
	}

	_isFunction(fn) {
		return typeof fn === 'function';
	}

    static resolve(value) {
        return new MPromise(resolve => {
            resolve(value)
        })
    }
    static reject(reason) {
        return new MPromise((_, reject) => {
            reject(reason)
        })
    }
    static race(promiseArr) {
        return new MPromise((resolve, reject) => {
            promiseArr.forEach(promise => {
                promise.then((value) => {
                    resolve(value);
                }, (reason) => {
                    reject(reason);
                })
            });
        });
    }
    static all(promiseArr) {
        const arr = [];
        let point = 0;
        const length = promiseArr.length;
        return new MPromise((resolve, reject) => {
            promiseArr.forEach((promise, index) => {
                promise.then(value => {
                    arr[index] = value;
                    point++;
                    if (point === length) {
                        resolve(arr);
                    }
                }, reason => {
                    reject(reason);
                })
            })
        })
    } 
}

const p = new MPromise((resolve, reject) => {
    setTimeout(() => {
    	resolve(1);
    }, 2000);
});
p.then((res) => {
    console.log(res);
    return 2
}).then(res => {
    console.log(res);
})




MPromise.resolve(200).then(res => {
    console.log('resolve:', res);
})

MPromise.all([
    new MPromise(resolve => {
        setTimeout(() => resolve('111'), 1000)
    }),
    new MPromise(resolve => {
        setTimeout(() => resolve('222'), 500)
    })
]).then(res => {
    console.log('all', res)
})
