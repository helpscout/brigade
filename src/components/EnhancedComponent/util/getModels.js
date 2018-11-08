import Backbone from 'backbone'

const getModels = (data = {}) => {
  return Object.values(data).filter(val => val instanceof Backbone.Model)
}

export default getModels
