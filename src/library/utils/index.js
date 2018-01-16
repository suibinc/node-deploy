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

export function randomString() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function guid() {
    return (randomString() + randomString() + '-' + randomString() + '-' + randomString() + '-' + randomString() + '-' + randomString() + randomString() + randomString());
}

export function eq(arr1, arr2) {
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, l = arr1.length; i < l; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            if (!eq(arr1[i], arr2[i])) return false;
        } else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}