let mocha = require('mocha'),
    chai = require('chai'),
    fs = require('fs'),
    ClassScaffold = require('../../src/Console/Scaffold/ClassScaffold');

chai.should();

describe('ClassScaffold', () => {
    let scaffold;

    it('set class name', () => {
        scaffold = new ClassScaffold('TestClass');

        scaffold.should.have.property('className').that.equals('TestClass');
    });

    it('add new method', () => {
        scaffold.addMethod('test', 'Good one here', ['param1', 'param2'], 'return "cool";');

        scaffold.methodList.should.have.property('length').that.equal(1);
        scaffold.methodList[0].should.deep.equals({
            'name': 'test',
            'comment': 'Good one here',
            'param': 'param1, param2',
            'body': 'return "cool";'
        });
    });

    it('adds namespace', () => {
        scaffold.setNamespace('App/Test/@{className}');
        scaffold.namespace.should.equal('App/Test/@{className}');
    });

    it('generate method with empty body', () => {
        scaffold.methodList = [];
        scaffold.addMethod('test', 'Good one here', ['param1', 'param2']);
        scaffold.generateTemplate();
        scaffold.template.should.equal("class @{className} {\n\t/**\n\t* Good one here\n\t**/\n\ttest(param1, param2) {\n\t\t\n\n\t}\n}\n\nnamespace(\'App/Test/@{className}\', @{className});");
    });
});