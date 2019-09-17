import * as path from 'path';
import * as fs from 'fs';
import * as es from 'event-stream';
import * as _rimraf from 'rimraf';
import { ThroughStream } from 'through';

/**
 * 获取需要编译得目录的TS配置文件
 *
 * @export
 * @param {string} src
 * @returns
 */
export function getTypeScriptCompilerOptions(src: string) {
	const rootDir = path.join(__dirname, `../../${src}`);
	console.log(rootDir);
	const tsconfig = require(`../../${src}/tsconfig.json`);
	let options: { [key: string]: any };
	if (tsconfig.extends) {
		options = Object.assign(
			{},
			require(path.join(rootDir, tsconfig.extends)).compilerOptions,
			tsconfig.compilerOptions
		);
	} else {
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

/**
 * 将文件路径转化为
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

export interface FilterStream extends NodeJS.ReadWriteStream {
	restore: ThroughStream;
}

/**
 *
 *
 * @export
<<<<<<< HEAD
 * @param {(data: any) => boolean} fn
 * @returns {FilterStream}
 */
export function filter(fn: (data: any) => boolean): FilterStream {
	const result = <FilterStream>(<any>es.through(function(data) {
=======
 * @param {*} this
 * @param {(data: any) => boolean} fn
 * @returns {FilterStream}
 */
export function filter(this: any, fn: (data: any) => boolean): FilterStream {
	const result = <FilterStream>(<any>es.through(data => {
>>>>>>> e109487f5e5d8bb8624950ca4e44778d0baacb1d
		if (fn(data)) {
			this.emit('data', data);
		} else {
			result.restore.push(data);
		}
	}));
<<<<<<< HEAD

=======
>>>>>>> e109487f5e5d8bb8624950ca4e44778d0baacb1d
	result.restore = es.through();
	return result;
}

/**
<<<<<<< HEAD
 * 删除指定目录
 *
 * @export
 * @param {string} dir
 * @returns {(cb: any) => void}
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
=======
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
>>>>>>> e109487f5e5d8bb8624950ca4e44778d0baacb1d
}
