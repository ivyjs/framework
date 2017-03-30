class Helper {
    /**
     * Add char on the remaining place until length is reached.
     *
     * @param string
     * @param length
     * @param chars
     * @return {*}
     */
    static padEnd(string, length, chars) {
        const strLength = length ? string.length : 0;
        return (length && strLength < length)
            ? (string + chars.repeat(length - strLength))
            : string
    }

    /**
     * Require every file from folder.
     *
     * @param folderPath
     */
    static requireFromFolder(folderPath) {
        const path = require('path');
        folderPath = path.join(process.env.PWD, folderPath);
        require("fs").readdirSync(folderPath).forEach(function(file) {
            require(path.join(folderPath, file));
        });
    };
}

namespace('Ivy/Helper', Helper);