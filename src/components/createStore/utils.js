export const BRIGADE_MODEL_KEY = '__SECRET_BRIGADE_MODEL_KEY__'

export const getModelsFromProps = (data = {}) => {
  return Object.keys(data).reduce((accumulator, key) => {
    const value = data[key]
    if (isBackboneModel(value)) {
      enhanceBackboneModelWithBrigade(value, key)
      accumulator.push(value)
    }

    return accumulator
  }, [])
}

export const enhanceBackboneModelWithBrigade = (model, key) => {
  if (!isBackboneModel(model)) return model
  model[BRIGADE_MODEL_KEY] = key

  return model
}

export const isBackboneModel = obj =>
  obj && typeof obj === 'object' && typeof obj.toJSON === 'function'
