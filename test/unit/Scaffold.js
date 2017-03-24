let mocha = require('mocha'),
    chai = require('chai'),
    Scaffold = require('../../src/Console/Scaffold'),
    fs = require('fs');

chai.should();

describe('Scaffold', () => {
    let scaffold;

    it('adds custom template', () => {
        scaffold = new Scaffold('good @{text} is here!');
        scaffold.should.have.property('template').that.equals('good @{text} is here!');
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
});