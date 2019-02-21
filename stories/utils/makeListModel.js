import {faker} from '@helpscout/helix'

const makeListModel = function() {
  return {
    name: `${faker.name.firstName()()}'s List`,
    createdAt: new Date(),
  }
}

export default makeListModel
