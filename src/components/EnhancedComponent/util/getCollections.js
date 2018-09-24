import Backbone from 'backbone'

const getCollections = (data = {}) => {
  return Object.values(data).filter(val => val instanceof Backbone.Collection)
}

export default getCollections
