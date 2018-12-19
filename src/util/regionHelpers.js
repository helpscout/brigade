import $ from 'jquery'
import Marionette from 'backbone.marionette'

let i = 0

function makeRegionIdentifier() {
  i = i + 1
  return `region${i}`
}

export const makeRegion = () => {
  const regionIdentifier = makeRegionIdentifier()
  $('body').append(`<section id="${regionIdentifier}"></section>`)
  return new Marionette.Region({ el: $(`#${regionIdentifier}`) })
}

export const destroyRegion = region => {
  region.close()
  $(region.el.selector).remove()
}
