export function throttle(fn, delay, mustRunDelay) {
    let timer = null;
    let tStart = 0;
    return function () {
        let context = this;
        let args = arguments;
        let tCurr = +new Date();
        clearTimeout(timer);
        if (!tStart) {
            tStart = tCurr;
        }
        if (tCurr - tStart >= mustRunDelay) {
            fn.apply(context, args);
            tStart = tCurr;
        } else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
}

export function paramsToKvp(params) {
    if (params && typeof params === 'object') {
        let temp = [];
        for (let k in params) {
            if (params.hasOwnProperty(k) && params[k] !== undefined) {
                let value = typeof params[k] === 'object' ? JSON.stringify(params[k]) : params[k];
                temp.push(`${k}=${encodeURIComponent(value)}`);
            }
        }
        return temp.join('&');
    }
    return '';
}