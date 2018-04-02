const mocha = require('mocha');
const chai = require('chai');
const server = require('../../');
const Command = require('../../src/Console/Commands/Command');

chai.should();

describe('Command', () => {
    let command;

    before(() => {
        command = new Command();
    });

    it('sets the name of command', () => {
        command.name('test:command').should.be.instanceOf(Command);
        command.commandName.should.equal('test:command');
    });

    it('sets the description', () => {
        command.description('This is a test command').should.be.instanceOf(Command);
        command.descriptionText.should.equal('This is a test command');
    });

    it('sets the usage example', () => {
        command.usage('test:command {name}').should.be.instanceOf(Command);
        command.usageText.should.equal('test:command {name}');
    });

    it('should add an option', () => {
        command
            .option(
                '--add',
                command => {
                    command.parameters[0] += 5;
                },
                'Increase number by 5.'
            )
            .should.be.instanceOf(Command);

        command.options.should.have.property('--add');
        command.options['--add'].should.have
            .property('callback')
            .that.is.instanceOf(Function);
        command.options['--add'].should.have
            .property('description')
            .that.equals('Increase number by 5.');
    });

    it('should create a callback for command', () => {
        command
            .execute(command => {
                return `number is ${command.parameters[0]}`;
            })
            .should.be.instanceOf(Command);

        command.callback.should.be.instanceOf(Function);
    });

    it('returns help', () => {
        command
            .help()
            .should.equal(
                'Command: \n    test:command\nDescription: \n    This is a test command\nUsage: \n    test:command {name}\nOptions:\n  --add            Increase number by 5.\n  --help           Show help menu'
            );
    });

    it('runs the command', () => {
        command.run([1], ['--add']).should.equal('number is 6');
    });

    it('ignores the parameter if doesnt exist', () => {
        command.run([1], ['--sub']).should.equal('number is 1');
    });
});
