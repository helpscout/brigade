import Cocktail from 'backbone.cocktail'

const applyMixin = (view, mixin, blend = Cocktail.mixin) => {
  return blend(view, mixin)
}

export default applyMixin
