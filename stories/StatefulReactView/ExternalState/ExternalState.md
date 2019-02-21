# External State

Sometimes it is necessary to pass stateful information from a Backbone parent app into a Redux application. This is something that our legacy `ReactMounter` accomplished, but it did so in a rather opinionated, brittle way that didn't lend itself to moving application logic into Redux.

This example leverages our `StatefulReactView` in conjunction with our `createStore` and `createExternalStateReducer` utilities, to create a full React-Redux application, but where a portion of its state is managed externally by a Backbone Model and Collection.

Note that the TodoApp components are identical to the InternalState example. The idea is that an application might start out like this one, and then be refactored to move all state logic into Redux, like was done in the Internal State example
