module.exports = {
  'root': true,
  'env': {
    'node': true
  },
  'settings' : {
    'import/extensions': ['.js', '.jsx']
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/airbnb'
  ],
  'parserOptions': {
    'parser': 'babel-eslint'
  },
  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-promise-reject-errors': 0,
    'prefer-const': 2,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-unused-expressions': 0,
    'no-return-await': 0,
    'no-unused-vars': 0,
    'no-param-reassign': 0,
    'space-before-function-paren': 0,
    'max-len' : ['error', {code : 300}]
  }
}
