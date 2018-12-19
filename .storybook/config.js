import {addDecorator, configure} from '@storybook/react'

// side-effect!
import '@helpscout/hsds-react/css/blue.css'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
