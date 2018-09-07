import Cocktail from "backbone.cocktail";

const applyMixin = (view, mixin) => {
  return Cocktail.mixin(view, mixin);
};

export default applyMixin;
