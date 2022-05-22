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
			: (reason) => { throw reason }

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
					this.FULFILLED_CB_LIST.push(onRealFulFilled);
					this.REJECTED_CB_LIST.push(onRealRejected);

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
}

const p = new MPromise((resolve, reject) => {
	resolve();
});
p.then((res) => {
	console.log('fulfilled', res);
	throw 'xxi';
}, rej => {
	console.log('rejected', rej);
}).catch((err) => {
	console.log('catch', err, p);
});
