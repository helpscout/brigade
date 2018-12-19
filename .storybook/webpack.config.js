const path = require('path')

module.exports = storybookBaseConfig => {
  storybookBaseConfig.resolve.alias['backbone'] = path.resolve(__dirname, '../shims/backbone.js')
  storybookBaseConfig.resolve.alias['backbone.marionette'] = path.resolve(__dirname, '../shims/marionette.js')

  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader'],
    include: path.resolve(__dirname, '../')
  })

  // Have to exclude the shims/ so they don't get babel pre-compiled
  storybookBaseConfig.module.rules[0].exclude.push(path.resolve(__dirname, '../shims'))

  return storybookBaseConfig
}
