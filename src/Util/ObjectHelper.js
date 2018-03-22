class ObjectHelper {
    constructor() {
        this.collection = {};
    }

    /**
     * Determinate if collection has the given key.
     *
     * @param collection
     * @param key
     * @return {boolean}
     */
    hasInCollection(collection, key) {
        return !!collection[key];
    }

    /**
     * Check if this collection has the given key.
     *
     * @param key
     * @return {boolean}
     */
    has(key) {
        return this.hasInCollection(this.collection, key);
    }

    /**
     * Get the element by key.
     *
     * @param key
     * @param defaultValue
     * @return {boolean} || {*}
     */
    get(key, defaultValue) {
        if (!key) {
            return false;
        }

        return this.has(key) ? this.collection[key] : defaultValue;
    }

    /**
     * Return an element keyed with dot notation.
     *
     * @param key
     * @param defaultValue
     * @return {*}
     */
    getWithDotNotation(key, defaultValue) {
        if (!key) {
            return false;
        }

        if (this.has(key)) {
            return this.collection[key];
        }

        let splittedPath = key.split('.');
        let iterator = this.collection;

        for (let i = 0; i < splittedPath.length; i++) {
            if (this.hasInCollection(iterator, splittedPath[i])) {
                iterator = iterator[splittedPath[i]];
                continue;
            }

            return defaultValue;
        }
        return iterator;
    }
}

module.exports = ObjectHelper;
