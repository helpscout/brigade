const result = (obj = {}, propName = '') => {
  const prop = obj[propName]
  if (typeof prop === 'function') {
    return prop.call(obj)
  }
  return prop
}

export default result
