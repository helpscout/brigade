export default (builder, view) =>
  typeof builder === 'function' ? builder.apply(view) : builder
