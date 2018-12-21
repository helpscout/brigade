import {transformValueToProp} from '.'

const transformDataToProps = (data = {}) =>
  Object.keys(data).reduce((accumulator, key) => {
    const value = data[key]
    const prop = transformValueToProp(value)
    return {
      ...accumulator,
      [key]: prop,
    }
  }, {})

export default transformDataToProps
