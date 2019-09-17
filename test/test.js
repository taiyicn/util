'use strict';

const util = require('../lib');
const expect = require('expect');
const path = require('path');

describe('taiyi util test', () => {
	it('rimraf', () => {
		util.rimraf('out');
	});
});
