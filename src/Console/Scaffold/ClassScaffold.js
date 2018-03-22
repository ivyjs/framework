let Scaffold = require('.');

class ClassScaffold extends Scaffold {
    constructor(className) {
        super();
        this.className = className;
        this.methodList = [];
        this.namespace = 'App/{className}';
    }

    /**
     * Sets the new namespace.
     *
     * @param namespace
     */
    setNamespace(namespace) {
        this.namespace = namespace;
    }

    /**
     * Adds a new method to the list.
     *
     * @param name
     * @param comment
     * @param params
     * @param body
     */
    addMethod(name, comment, params = [], body) {
        this.methodList.push({
            name: name,
            comment: comment,
            param: params.join(', '),
            body: body || ''
        });
    }

    /**
     * Generate a class file.
     *
     * @param filePath
     */
    generateClass(filePath) {
        this.generateTemplate();
        this.bind({
            className: this.className,
            extendClass: this.extends,
            namespace: this.namespace
        });
        return this.generateFile(filePath);
    }

    /**
     * Generate and set the template for a given class.
     */
    generateTemplate() {
        let template = 'class @{className} {\n';

        this.methodList.forEach((method) => {
            template += '\n\t/**\n';
            template += `\t* ${method.comment}\n`;
            template += `\t**/\n`;
            template += `\t${method.name}(${method.param})`;
            template += ' {\n';
            template += `\t\t${method.body}\n`;
            template += `\t}\n`;
        });
        template += '}\n\n' +
                `namespace('${this.namespace}', @{className});`;
        this.setTemplate(template);
    }
}

module.exports = ClassScaffold;
