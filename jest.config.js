const jestConfig = require('@helpscout/zero/jest')

module.exports = Object.assign(jestConfig, {
  coveragePathIgnorePatterns: ['src/index.js'],
  setupTestFrameworkScriptFile: '<rootDir>jest.setup.js',
  moduleNameMapper: {
    '^backbone$': `${__dirname}/shims/backbone.js`,
  },
  testURL: 'http://localhost/',
})
