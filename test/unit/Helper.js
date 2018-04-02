const mocha = require('mocha');
const chai = require('chai');
const Helper = use('Ivy/Helper');
require('../..');

chai.should();

describe('Helper', () => {
    it('adds characted for the remaining space', () => {
        Helper.padEnd('good', 5, ' ').should.equal('good ');
    });

    it('make string length 0 if length not provided', () => {
        Helper.padEnd('good', false, '*').should.equal('good');
    });

    it('require from path should not throw', () => {
        (() => {
            return Helper.requireFromFolder('test/unit/Classes');
        }).should.not.throw();
    });

    it('ensures that data is array', () => {
        Helper.ensureArray(['test']).should.deep.equal(['test']);
        Helper.ensureArray('test').should.deep.equal(['test']);
    });
});
