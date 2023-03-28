module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:ui-testing/playwright",
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
        "ui-testing/no-tag-name-selector": "error", // default = warn
        "ui-testing/no-css-page-layout-selector": "warn", // default = error
 
    }
}
