module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": "off",
        "no-param-reassign": "off",
        "no-loop-func": "off",
        "no-console": "off",
        "no-plusplus": "off",
        "no-shadow": "off",
        "prefer-const": "off",
        "camelcase": "off",
        "max-len": "off"
    }
};