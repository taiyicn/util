"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
const path = require("path");
const fs = require("fs");
const es = require("event-stream");
const _rimraf = require("rimraf");
function getTypeScriptCompilerOptions(src) {
    const rootDir = path.join(__dirname, `../../${src}`);
    console.log(rootDir);
    const tsconfig = require(`../../${src}/tsconfig.json`);
    let options;
    if (tsconfig.extends) {
        options = Object.assign({}, require(path.join(rootDir, tsconfig.extends)).compilerOptions, tsconfig.compilerOptions);
    }
    else {
        options = tsconfig.compilerOptions;
    }
    options.verbose = false;
    options.sourceMap = true;
    if (process.env['TAIYI_NO_SOURCEMAP']) {
        options.sourceMap = false;
    }
    options.rootDir = rootDir;
    options.baseUrl = rootDir;
    options.sourceRoot = toFileUri(rootDir);
    options.newLine = /\r\n/.test(fs.readFileSync(__filename, 'utf8'));
    return options;
}
exports.getTypeScriptCompilerOptions = getTypeScriptCompilerOptions;
function toFileUri(filePath) {
    const match = filePath.match(/^([a-z])\:(.*)$/i);
    if (match) {
        filePath = '/' + match[1].toUpperCase() + ':' + match[2];
    }
    return 'file://' + filePath.replace(/\\/g, '/');
}
exports.toFileUri = toFileUri;
function filter(fn) {
    const result = es.through(function (data) {
        if (fn(data)) {
            this.emit('data', data);
        }
        else {
            result.restore.push(data);
        }
    });
    result.restore = es.through();
    return result;
}
exports.filter = filter;
=======
const _rimraf = require("rimraf");
const path = require("path");
const es = require("event-stream");
>>>>>>> e109487f5e5d8bb8624950ca4e44778d0baacb1d
function rimraf(dir) {
    let retries = 0;
    const retry = (cb) => {
        _rimraf(dir, { maxBusyTries: 1 }, (err) => {
            if (!err) {
                return cb();
            }
            if (err.code === 'ENOTEMPTY' && ++retries < 5) {
                return setTimeout(() => retry(cb), 10);
            }
            return cb(err);
        });
    };
    retry.taskName = `clean-${path.basename(dir).toLowerCase()}`;
    return retry;
}
exports.rimraf = rimraf;
<<<<<<< HEAD
=======
function filter(fn) {
    const result = es.through(data => {
        if (fn(data)) {
            this.emit('data', data);
        }
        else {
            result.restore.push(data);
        }
    });
    result.restore = es.through();
    return result;
}
exports.filter = filter;
>>>>>>> e109487f5e5d8bb8624950ca4e44778d0baacb1d
