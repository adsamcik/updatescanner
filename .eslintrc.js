module.exports = {
  extends: [
    'eslint:recommended',
    'google',
  ],

  plugins: [
    'jsdoc',
  ],

  rules: {
    // Don't allow assignment in conditionals
    'no-cond-assign': ['error', 'except-parens'],
    // We're allowed to log to console
    'no-console': 'off',
    // Downgrade JSDoc requirement to a warning
    'require-jsdoc': 'warn',
    // Use @returns if the function returns
    'valid-jsdoc': ['error', {
      'requireReturn': false,
      'prefer': {'return': 'returns'},
    }],
    // Turn on all jsdoc checks
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/newline-after-description': 'error',
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-param': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-returns-description': 'error',
    'jsdoc/require-returns-type': 'error',
  },

  'env': {
    'es6': 'true',
    'webextensions': 'true',
    'browser': 'true',
  },
};