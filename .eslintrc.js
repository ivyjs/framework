module.exports = {
    "env": {
        "node": true,
        "mocha": true
    },
    "globals": {
        "use": true,
        "namespace": true,
        "singleton": true,
        "alias": true,
        "bind": true,
        "app": true,
        "describe": true,
        "it": true,
        "before": true,
        "beforeEach": true,
        "afterEach": true
    },
    "extends": "standard",
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "space-before-function-paren": ["error", "never"],
        "no-unused-vars": [
            "error", { "varsIgnorePattern": "mocha" }
        ]
    },
};
