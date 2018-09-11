const jestConfig = require('@helpscout/zero/jest')

module.exports = Object.assign(jestConfig, {
  testUrl: 'http://localhost/',
})
