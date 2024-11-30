// @ts-check
const rootConfig = require("../../eslint.config");

module.exports = [
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "tagify",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "tagify",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
