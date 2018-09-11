import Backbone from "backbone";

const getModels = (data = {}) => {
  return Object.values(data).filter(value => {
    return value instanceof Backbone.Model;
  });
};

export default getModels;
