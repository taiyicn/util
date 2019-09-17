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
 * @param {(data: any) => boolean} fn
 * @returns {FilterStream}
 */
export function filter(fn: (data: any) => boolean): FilterStream {
	const result = <FilterStream>(<any>es.through(function(data) {
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
 * 删除指定目录
 *
 * @export
 * @param {string} dir
 * @returns {(cb: any) => void}
 */
export function rimraf(dir: string): (cb: any) => void {
	let retries = 0;

	const retry = (fn: (err?: any) => void) => {
		_rimraf(dir, { maxBusyTries: 1 }, (err: any) => {
			if (!err) {
				return fn();
			}

			if (err.code === 'ENOTEMPTY' && ++retries < 5) {
				return setTimeout(() => retry(fn), 10);
			}

			return fn(err);
		});
	};
	retry.taskName = `clean-${path.basename(dir).toLowerCase()}`;
	return retry;
}
