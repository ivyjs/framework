let mocha = require('mocha'),
    chai = require('chai'),
    Scaffold = require('../../src/Console/Scaffold'),
    fs = require('fs');

chai.should();

describe('Scaffold', () => {
    let scaffold;

    before(() => {
        try {
            fs.unlinkSync(__dirname + '/ScaffoldTest/test.js');
        } catch (e) {
        }
    });

    it('adds custom template', () => {
        scaffold = new Scaffold('good @{text} is here!');
        scaffold.should.have.property('template').that.equals('good @{text} is here!');
    });

    it('binds variables', () => {
        scaffold.bind({ text: 'car' });
        scaffold.should.have.property('template').that.equals('good car is here!');
    });

    it('outputs file', (done) => {
        let filePath = __dirname + '/ScaffoldTest/test.txt';

        scaffold.generateFile(filePath);

        fs.readFile(filePath, (err, data) => {
            data.toString().should.equal('good car is here!');
            done();
        });
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