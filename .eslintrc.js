module.exports = {
    "root": true,
    "env": {
        "node": true,
        "commonjs": true,
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "plugin:ui-testing/playwright",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
    },
    "plugins": [
       "ui-testing",
    ],
    "rules": {
        "ui-testing/no-hard-wait": ["error", "playwright"]
    }
}
