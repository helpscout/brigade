import {addDecorator, configure} from '@storybook/react'
import {withOptions} from '@storybook/addon-options'
import '@storybook/addon-storysource/register'

// side-effect!
import '@helpscout/hsds-react/css/blue.css'

addDecorator(
  withOptions({
    name: 'Brigade',
  }),
)

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
