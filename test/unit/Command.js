let mocha = require('mocha'),
    chai = require('chai'),
    Command = require('../../src/Console/Commands/Command');

chai.should();

describe('Command', () => {
    let command;
    
    before(() => {
        command = new Command();
    });
    
    it('gets the name of the command', () => {
        Command.commandName().should.equal('default');
    });
    
    it('binds the command parameters', () => {
        command.setCommandParameters({ 'param1': 'cool' });
        command.parameters.should.deep.equal({ 'param1': 'cool' });
    });

    it('runs the command', () => {
        command.run().should.equal(false);
    });

    it('gets the description of the command', () => {
        Command.description().should.equal('default');
    });

    it('gets the help of the app', () => {
        Command.help().should.equal(false);
    });
});