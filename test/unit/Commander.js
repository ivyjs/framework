let mocha = require('mocha'),
    chai = require('chai'),
    sinon = require('sinon'),
    Commander = require('../../src/Console'),
    Command = require('../../src/Console/Commands/Command');

chai.should();

describe('Commander', () => {
    let commander;

    before(() => {
        commander = new Commander();
        sinon.spy(console, 'log');
    });

    it('returns a new command builder', () => {
        commander.register('test:command').execute(() => { return 'cool command'; }).should.be.instanceOf(Command);
    });

    it('registers a new command', () => {
        commander.commandsContainer.should.have.property('test:command');
        commander.commandsContainer['test:command'].should.be.instanceOf(Command);
        commander.commandsContainer['test:command'].should.have.property('commandName').that.equals('test:command');
    });

    it('returns a list of commands', () => {
        let list = commander.getCommandsList();
        list.should.have.property('test:command');
    });

    it('filters the arguments list', () => {
        let arguments = ['23', '--test'];

        commander.filterArguments(arguments).should.deep.equal({
            parameters: ['23'],
            options: ['--test']
        });

        commander.filterArguments('test').should.deep.equal({
            parameters: [],
            options: []
        });
    });

    it('runs help if command exists', () => {
        commander.runHelp('test:command');
        console.log.should.be.called;
    });

    it('runs a help if its included in arguments list', () => {
        commander.run(['test:command', '--help']);
        console.log.should.be.called;
    });

    it('returns false if command doesnt exist', () => {
        commander.run(['test']).should.be.false;
    });

    it('executes a command', () => {
        commander.run(['test:command']);
        console.log.should.be.called;
    })
});