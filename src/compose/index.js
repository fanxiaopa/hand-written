function compose(...args) {
    return (x) => {
        return args.reduce((pre, next) => {
            return next(pre);
        }, x);
    }
}
module.exports = compose;