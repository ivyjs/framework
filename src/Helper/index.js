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
}

namespace('Ivy/Helper', Helper);