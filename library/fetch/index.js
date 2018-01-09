import 'whatwg-fetch';
import fetchJsonp from './fetch-jsonp';
import { Promise } from 'es6-promise';
import { paramsToKvp } from '../utils';

let store = {};

function formatFetchResponse(response) {
    let httpCode = response.status || -1;
    return new Promise((resolve, reject) => {
        response.json().then((data) => {
            if (typeof data === 'object') {
                data.httpCode = httpCode;
            }
            resolve(data);
        }).catch((e) => {
            reject(e);
        });
    });
}

store.fetchGet = (url, params) => {
    let options = {
        method: 'GET',
        credentials: 'include'
    };
    if (params) {
        let paramArray = [];
        for (let index in params) {
            if (params.hasOwnProperty(index)) {
                paramArray.push(`${index}=${params[index]}`);
            }
        }
        url += `?${paramArray.join('&')}`;
    }
    return new Promise((resolve, reject) => {
        window.fetch(url, options).then(response => formatFetchResponse(response)).then(data => {
            resolve(data);
        }).catch((res) => {
            reject(res);
        });
    });
};

store.fetchJson = (url, params) => {
    let options = {
        method: 'GET'
    };
    if (params) {
        let paramArray = [];
        for (let index in params) {
            if (params.hasOwnProperty(index)) {
                paramArray.push(`${index}=${params[index]}`);
            }
        }
        url += `?${paramArray.join('&')}`;
    }
    return new Promise((resolve, reject) => {
        window.fetch(url, options).then(response => formatFetchResponse(response)).then(data => {
            resolve(data);
        }).catch((res) => {
            reject(res);
        });
    });
};

store.fetchPost = (url, params, isCros = false, isForm = false) => {
    let options = {
        method: 'POST',
        credentials: 'include'
    };
    if (isCros) options.mode = 'cors';
    if (!isForm) {
        options.headers = {
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(params);
    } else {
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        options.body = paramsToKvp(params);
    }
    return new Promise((resolve, reject) => {
        window.fetch(url, options).then(response => formatFetchResponse(response)).then(data => {
            resolve(data);
        }).catch((res) => {
            reject(res);
        });
    });
};

store.fetchJsonp = (url, options, params) => {
    return new Promise((resolve, reject) => {
        let paramStr = paramsToKvp(params);
        paramStr = paramStr ? `?${paramStr}` : '';
        let jsonpParams = {
            type: options.type,
            jsonpCallbackFunction: options.callBack,
            nocache: options.nocache || false
        };
        fetchJsonp(url + paramStr, jsonpParams).then(response => formatFetchResponse(response)).then(json => {
            resolve(json);
        }).catch((res) => {
            reject(res);
        });
    });
};

store.getWithToken = (url, params) => {
    params = params === undefined ? {} : params;
    return new Promise((resolve, reject) => {
        store.fetchGet('//bangumi.bilibili.com/web_api/get_token').then(json => {
            if (json.code === 0) {
                params.token = json.result.token;
                store.fetchGet(url, params).then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
            } else {
                reject(json.message);
            }
        }, error => {
            reject(error);
        });
    });
};

store.postWithToken = (url, params) => {
    params = params === undefined ? {} : params;
    return new Promise((resolve, reject) => {
        store.fetchGet('//bangumi.bilibili.com/web_api/get_token').then(json => {
            if (json.code === 0) {
                params.token = json.result.token;
                store.fetchPost(url, params, false, true).then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
            } else {
                reject(json.message);
            }
        }, error => {
            reject(error);
        });
    });
};

store.postImage = (formData) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            credentials: 'include'
        };
        options.body = formData;
        window.fetch('//bangumi.bilibili.com/uploader/moe/2017/character', options).then(response => formatFetchResponse(response)).then(data => {
            resolve(data);
        }).catch((res) => {
            reject(res);
        });
    });
};

store.postFormData = (url, formData) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            credentials: 'include'
        };
        options.body = formData;
        window.fetch(url, options).then(response => formatFetchResponse(response)).then(data => {
            resolve(data);
        }).catch((res) => {
            reject(res);
        });
    });
};

export default store;