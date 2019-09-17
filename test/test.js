'use strict';

<<<<<<< HEAD
const util = require('../lib');
const expect = require('expect');
const path = require('path');

describe('taiyi util test', () => {
	it('should', () => {
		util.rimraf('./out');
=======
const util = require('../lib/index');
describe('gulp task test', () => {
	it('should return 2', () => {
		const cc = util.rimraf('test/out');
		cc(err => {
			console.log(err);
		});
	});
	it('filter', () => {
		const utf8Filter = util.filter(data => /(\/|\\)test(\/|\\).*utf8/.test(data.path));
>>>>>>> e109487f5e5d8bb8624950ca4e44778d0baacb1d
	});
});
