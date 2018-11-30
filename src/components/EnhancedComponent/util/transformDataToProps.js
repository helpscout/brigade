import {transformValueToProp} from '.'

const transformDataToProps = (data = {}, selector) => {
  const props = Object.keys(data).reduce((accumulator, key) => {
    accumulator[key] = transformValueToProp(data[key])
    return accumulator
  }, {})
  return selector ? selector(props) : props
}

export default transformDataToProps
