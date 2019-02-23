export const defaultRouteOptions = {
  reactRoutes: {},
  marionetteRoutes: {},
}

export const sanitizeRouteKey = route => {
  const [baseRoute] = route.split('(/)')

  return `${baseRoute}(/)(*notFound)`
}

export const combineAppRoutes = (routeOptions = defaultRouteOptions) => {
  const {reactRoutes, marionetteRoutes} = {
    ...defaultRouteOptions,
    ...routeOptions,
  }

  const enhancedReactRoutes = Object.keys(reactRoutes).reduce((routes, key) => {
    return {
      ...routes,
      [sanitizeRouteKey(key)]: reactRoutes[key],
    }
  }, {})

  return {
    ...enhancedReactRoutes,
    ...marionetteRoutes,
  }
}

export default combineAppRoutes
