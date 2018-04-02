const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const Scaffold = require('../../src/Console/Scaffold');
const fs = require('fs');

chai.should();

describe('Scaffold', () => {
    let scaffold;

    it('adds custom template', () => {
        scaffold = new Scaffold('good @{text} is here!');
        scaffold.should.have
            .property('template')
            .that.equals('good @{text} is here!');
    });

    it('binds variables', () => {
        scaffold.bind({ text: 'car' });
        scaffold.should.have.property('template').that.equals('good car is here!');
    });

    it('sets the template', () => {
        scaffold.setTemplate('Great @{text}!');
        scaffold.template.should.equal('Great @{text}!');
    });

    it('sets the empty value when binding is not given', () => {
        scaffold.bind({});
        scaffold.should.have.property('template').that.equals('Great !');
    });

    it('generates a file', () => {
        sinon.stub(fs, 'writeFileSync').returns(true);
        scaffold.generateFile('test/path').should.equal(true);
        fs.writeFileSync.restore();
    });
});
