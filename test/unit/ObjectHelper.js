let mocha = require('mocha'),
    chai = require('chai'),
    ObjectHelper = require('../../src/Util/ObjectHelper');

chai.should();

describe('ObjectHelper', function () {
    let helper;

    before(() => {
        helper = new ObjectHelper();
        helper.collection = {
            'app': {
                'test': {
                    'fillable': '123'
                },
                'good': 'bad'
            }
        };
    });

    it('determinates if collection has the key', () => {
        helper.has('test').should.be.equal(false);
        helper.has('app').should.be.equal(true);
    });

    it('returns undefined if key is not set for get', () => {
        helper.get().should.be.equal(false);
    });

    it('returns value if key exists for get', () => {
        helper.get('app').should.be.deep.equal({
            'test': {
                'fillable': '123'
            },
            'good': 'bad'
        });
    });

    it('returns default value when key is not found for get', () => {
        helper.get('test', 'good').should.be.equal('good');
    });

    it('returns false when no key is given to the dot notation getter', () => {
        helper.getWithDotNotation().should.be.equal(false);
    });

    it('returns level 0 value if key exists for dot notation getter', () => {
        helper.getWithDotNotation('app').should.be.deep.equal({
            'test': {
                'fillable': '123'
            },
            'good': 'bad'
        });
    });

    it('returns the value for splitted key path', () => {
        helper.getWithDotNotation('app.test.fillable').should.be.equal('123');
    });

    it('returns default value when key is not found', () => {
        helper.getWithDotNotation('app.test.t', 'good').should.be.equal('good');
    })
});