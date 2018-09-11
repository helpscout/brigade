const jestConfig = require('@helpscout/zero/jest')

module.exports = Object.assign(jestConfig, {
  coveragePathIgnorePatterns: ['src/index.js'],
  testURL: 'http://localhost/',
})
