"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _rimraf = require("rimraf");
const path = require("path");
const es = require("event-stream");
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
