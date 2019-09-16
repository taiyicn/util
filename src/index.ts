import * as path from 'path';
import * as fs from 'fs';
import * as _rimraf from 'rimraf';
import * as es from 'event-stream';
import { ThroughStream } from 'through';
import * as ts from 'typescript';

/**
 * 删除指定目录
 *
 * @export {}
 * @param {string} dir 目录路径
 * @returns {object} taskName,cb(err:any):void
 */
export function rimraf(dir: string): (cb: any) => void {
	let retries = 0;

	const retry = (cb: (err?: any) => void) => {
		_rimraf(dir, { maxBusyTries: 1 }, (err: any) => {
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

export interface FilterStream extends NodeJS.ReadWriteStream {
	restore: ThroughStream;
}

/**
 *
 *
 * @export
 * @param {*} this
 * @param {(data: any) => boolean} fn
 * @returns {FilterStream}
 */
export function filter(this: any, fn: (data: any) => boolean): FilterStream {
	const result = <FilterStream>(<any>es.through(data => {
		if (fn(data)) {
			this.emit('data', data);
		} else {
			result.restore.push(data);
		}
	}));
	result.restore = es.through();
	return result;
}

/**
 *
 *
 * @export
 * @param {string} filePath
 * @returns {string}
 */
export function toFileUri(filePath: string): string {
	const match = filePath.match(/^([a-z])\:(.*)$/i);

	if (match) {
		filePath = '/' + match[1].toUpperCase() + ':' + match[2];
	}

	return 'file://' + filePath.replace(/\\/g, '/');
}

/**
 *
 *
 * @export
 * @param {string} src
 * @returns {ts.CompilerOptions}
 */
export function getTypeScriptCompilerOptions(src: string): ts.CompilerOptions {
	const rootDir = path.join(__dirname, `../../${src}`);
	let options: ts.CompilerOptions = {};
	options.verbose = false;
	options.sourceMap = true;
	if (process.env['VSCODE_NO_SOURCEMAP']) {
		// To be used by developers in a hurry
		options.sourceMap = false;
	}
	options.rootDir = rootDir;
	options.baseUrl = rootDir;
	options.sourceRoot = toFileUri(rootDir);
	options.newLine = /\r\n/.test(fs.readFileSync(__filename, 'utf8')) ? 0 : 1;
	return options;
}
