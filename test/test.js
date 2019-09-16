'use strict';

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
	});
});
