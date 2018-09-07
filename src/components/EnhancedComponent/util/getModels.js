import Backbone from "backbone";

const getModels = (data = {}) =>
  Object.values(data).filter(value => value instanceof Backbone.Model);

export default getModels;
