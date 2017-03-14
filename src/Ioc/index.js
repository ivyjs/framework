'use strict';
let _namespaces = {};
let _bindings = {};
let _alias = {};
let _instances = {};

class Ioc {
    /**
     * Provides the access to the inner objects of container.
     * Done for testing purposes.
     *
     * @return {{_namespaces: {}, _bindings: {}, _alias: {}, _instances: {}}}
     */
    static innerAccess() {
        return {
            _namespaces,
            _bindings,
            _alias,
            _instances
        }
    }

    /**
     * Creates a new Binding for a given namespace.
     *
     * @param namespace
     * @param binding
     * @param singleton
     * @param deferred
     */
    static bind(namespace, binding, singleton = false, deferred = false) {
        _bindings[namespace] = {
            closure: binding,
            singleton: singleton
        };

        if (singleton && !deferred)
            Ioc.instantiate(namespace, binding, singleton);
    }

    /**
     * Instantiate
     * @param namespace
     * @param closure
     * @param singleton
     * @return {*}
     */
    static instantiate(namespace, closure, singleton) {
        if (singleton && _instances[namespace])
            return _instances[namespace];

        let instance = closure();

        if (singleton)
            _instances[namespace] = instance;

        return instance;
    }

    /**
     * A namespace binding in order to bind a class instead of an object or function.
     *
     * @param namespace
     * @param binding
     */
    static namespace(namespace, binding) {
        _namespaces[namespace] = binding;
    }

    /**
     * Create an alias for a given namespace.
     *
     * @param alias
     * @param namespace
     */
    static alias(alias, namespace) {
        _alias[alias] = namespace;
    }

    /**
     * Return binding.
     *
     * @param namespace
     * @return {*}
     */
    static use(namespace) {
        let binding;

        if (binding = Ioc.getByNamespace(namespace))
            return binding;

        throw new Error(`Namespace ${namespace} not found.`);
    }

    /**
     * Find a name for a given namespace and return the corresponding result.
     *
     * @param namespace
     * @return {*}
     */
    static getByNamespace(namespace) {
        let result;

        if (result = _bindings[namespace])
            return Ioc.instantiate(namespace, result.closure, result.singleton);

        if (result = _namespaces[namespace])
            return result;

        if (result = _alias[namespace])
            return Ioc.getByNamespace(result);

        return false;
    }

    /**
     * Creates a singleton binding.
     *
     * @param namespace
     * @param binding
     * @param deferred
     * @return {*}
     */
    static singleton(namespace, binding, deferred = false) {
        return Ioc.bind(namespace, binding, true, deferred);
    }

}

global.use = Ioc.use;
global.namespace = Ioc.namespace;
global.singleton = Ioc.singleton;
global.alias = Ioc.alias;
global.bind = Ioc.bind;

module.exports = Ioc;