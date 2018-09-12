const getModels = (data = {}) => {
  return Object.values(data).filter(value => {
    return (
      value && typeof value === 'object' && typeof value.toJSON === 'function'
    )
  })
}

export default getModels
