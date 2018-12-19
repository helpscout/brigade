import {transformValueToProp} from '.'

const transformDataToProps = (data = {}) =>
  Object.keys(data).reduce((accumulator, key) => {
    accumulator[key] = transformValueToProp(data[key])
    return accumulator
  }, {})

export default transformDataToProps
