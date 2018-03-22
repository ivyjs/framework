const path = require('path');
const fs = require('fs');

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
            : string;
    }

    /**
     * Require every file from folder.
     *
     * @param folderPath
     */
    static requireFromFolder(folderPath) {
        folderPath = path.join(process.env.PWD, folderPath);
        fs.readdirSync(folderPath).forEach(function(file) {
            require(path.join(folderPath, file));
        });
    };

    /**
     * Ensure that data is array.
     *
     * @param data
     * @return {[*]}
     */
    static ensureArray(data) {
        return Array.isArray(data) ? data : [data];
    }
}

namespace('Ivy/Helper', Helper);
