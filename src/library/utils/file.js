let fs = require('fs');
let pth = require('path');
let _exists = fs.existsSync;

/**
 * 递归创建文件夹
 * @param  {String} path 路径
 * @param  {Number} mode 创建模式
 * @memberOf fis.util
 * @name mkdir
 * @function
 */
function mkdir(path, mode) {
    if (typeof mode === 'undefined') {
        // 511 === 0777
        mode = 511 & (~process.umask());
    }
    if (_exists(path)) return;
    path.split('/').reduce(function (prev, next) {
        if (prev && !_exists(prev)) {
            fs.mkdirSync(prev, mode);
        }
        return prev + '/' + next;
    });
    if (!_exists(path)) {
        fs.mkdirSync(path, mode);
    }
}

/**
 * 读取文件内容
 * @param  {String} path    路径
 * @return {String}         文件内容
 * @name read
 * @function
 */
function readFileSync(path) {
    path = pth.resolve(path);
    var content = false;
    if (_exists(path)) {
        content = fs.readFileSync(path, 'utf-8');
    } else {
        return false;
    }
    return content;
}

/**
 * 写文件，若路径不存在则创建
 * @param  {String} path    路径
 * @param  {String} data    写入内容
 * @param  {Object} options 配置
 * @param  {Boolean} append  是否为追加模式
 * @name write
 * @function
 */
function writeFileSync(path, data, options, append) {
    path = pth.resolve(path);
    if (!_exists(path)) {
        mkdir(pathinfo(path).dirname);
    }
    if (append) {
        fs.appendFileSync(path, data, options);
    } else {
        fs.writeFileSync(path, data, options);
    }
}

/**
 * 生成路径信息
 * @param  {String|Array} path 路径，可使用多参数传递：pathinfo('a', 'b', 'c')
 * @return {Object}      @see ext()
 * @memberOf fis.util
 * @name pathinfo
 * @function
 */
function pathinfo(path) {
    //can not use _() method directly for the case pathinfo('a/').
    var type = typeof path;
    if (arguments.length > 1) {
        path = Array.prototype.join.call(arguments, '/');
    } else if (type === 'string') {
        //do nothing for quickly determining.
    } else if (type === 'object') {
        path = Array.prototype.join.call(path, '/');
    }
    return ext(path);
}

/**
 * path处理
 * @param  {String} str 待处理的路径
 * @return {Object}
 * @example
 * str = /a.b.c/f.php?kw=%B2%E5%BB%AD#addfhubqwek
 *                      {
 *                         origin: '/a.b.c/f.php?kw=%B2%E5%BB%AD#addfhubqwek',
 *                         rest: '/a.b.c/f',
 *                         hash: '#addfhubqwek',
 *                         query: '?kw=%B2%E5%BB%AD',
 *                         fullname: '/a.b.c/f.php',
 *                         dirname: '/a.b.c',
 *                         ext: '.php',
 *                         filename: 'f',
 *                         basename: 'f.php'
 *                      }
 * @name ext
 * @function
 */
function ext(str) {
    var info = query(str),
        pos;
    str = info.fullname = info.rest;
    if ((pos = str.lastIndexOf('/')) > -1) {
        if (pos === 0) {
            info.rest = info.dirname = '/';
        } else {
            info.dirname = str.substring(0, pos);
            info.rest = info.dirname + '/';
        }
        str = str.substring(pos + 1);
    } else {
        info.rest = info.dirname = '';
    }
    if ((pos = str.lastIndexOf('.')) > -1) {
        info.ext = str.substring(pos).toLowerCase();
        info.filename = str.substring(0, pos);
        info.basename = info.filename + info.ext;
    } else {
        info.basename = info.filename = str;
        info.ext = '';
    }
    info.rest += info.filename;
    return info;
}

/**
 * path处理，提取path中rest部分(?之前)、query部分(?#之间)、hash部分(#之后)
 * @param  {String} str 待处理的url
 * @return {Object}     {
 *                         origin: 原始串
 *                         rest: path部分(?之前)
 *                         query: query部分(?#之间)
 *                         hash: hash部分(#之后)
 *                      }
 * @name query
 * @function
 */
function query(str) {
    let rest = str,
        pos = rest.indexOf('#'),
        hash = '',
        query = '';
    if (pos > -1) {
        hash = rest.substring(pos);
        rest = rest.substring(0, pos);
    }
    pos = rest.indexOf('?');
    if (pos > -1) {
        query = rest.substring(pos);
        rest = rest.substring(0, pos);
    }
    rest = rest.replace(/\\/g, '/');
    if (rest !== '/') {
        // 排除由于.造成路径查找时因filename为''而产生bug，以及隐藏文件问题
        rest = rest.replace(/\/\.?$/, '');
    }
    return {
        origin: str,
        rest: rest,
        hash: hash,
        query: query
    };
}

export default {
    mkdir,
    readFileSync,
    writeFileSync,
    pathinfo,
    ext,
    query
};