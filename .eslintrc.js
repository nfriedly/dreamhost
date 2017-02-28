'use strict';

module.exports = {
  "env": {
    "node": true,
  },
  "plugins": [
    "node",
  ],
  "extends": [
    "eslint:recommended",
    "google",
    "plugin:node/recommended",
  ],
  "rules": {
    "prefer-const": "error",
    "strict": "error",
    "max-len": ["warn", 160],
    "arrow-parens": ["error", "as-needed"],
  }
};
