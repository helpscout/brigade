import Backbone from 'backbone'

export const BRIGADE_MODEL_KEY = '__SECRET_BRIGADE_MODEL_KEY__'
export const COLLECTION_EVENTS = 'add change remove reset'
export const MODEL_EVENTS = 'change'

export const getModelsFromProps = (data = {}) => {
  return Object.keys(data).reduce((accumulator, key) => {
    const value = data[key]
    if (isModel(value)) {
      enhanceBackboneClassWithBrigade(value, key)
      accumulator.push(value)
    }

    return accumulator
  }, [])
}

export const getCollectionsFromProps = (data = {}) => {
  return Object.keys(data).reduce((accumulator, key) => {
    const value = data[key]
    if (isCollection(value)) {
      enhanceBackboneClassWithBrigade(value, key)
      accumulator.push(value)
    }

    return accumulator
  }, [])
}

export const enhanceBackboneClassWithBrigade = (backboneClass, key) => {
  if (!isBackboneClass(backboneClass)) return backboneClass
  backboneClass[BRIGADE_MODEL_KEY] = key

  return backboneClass
}

export const isModel = obj => obj && obj instanceof Backbone.Model
export const isCollection = obj => obj && obj instanceof Backbone.Collection
export const isBackboneClass = obj => isModel(obj) || isCollection(obj)
