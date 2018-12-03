import {applyMixin} from './util'
import {ReactMixin} from './mixins'

const brigade = view => applyMixin(view, ReactMixin)

export {connect} from './components'
export default brigade
