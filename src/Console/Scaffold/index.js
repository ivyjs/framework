let fs = require('fs');

class Scaffold {
    constructor(template) {
        this.template = template;
    }

    /**
     * Set the template of file.
     *
     * @param template
     */
    setTemplate(template) {
        this.template = template;
    }

    /**
     * Bind data to the template.
     *
     * @param data
     */
    bind(data) {
        this.template = this.template.replace(/\@{[^{}]+}/g, function(w) {
            w = w.slice(2, -1).trim();
            return data[w] ? data[w] : "";
        });
    }

    /**
     * Generate a file and write template to it.
     *
     * @param path
     */
    generateFile(path) {
        fs.writeFileSync(path, this.template);
    }
}

module.exports = Scaffold;