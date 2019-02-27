# External State

Sometimes it is necessary to pass stateful information from a Backbone parent app into a Redux application. This is something that our legacy `ReactMounter` accomplished, but it did so in a rather opinionated, brittle way that didn't lend itself to moving application logic into Redux.

While we should prefer the "Internal State" pattern where a completely independent Redux store is created externally and passed into the `StatefulReactView`, it may be the case that even a large slice of an application may depend for a piece of its state on a legacy Backbone View elsewhere on the page. 

This example uses our `createExternalReducers` utility to create an externally-controlled slice of Redux state, `meta` which is controlled by a Backbone `Model`, which will automatically update the store when its state changes. This Model is then passed into a Backbone View which allows its `name` attribute to be updated.  

Note that the TodoApp components are identical to the InternalState example. It should be straightforward to replace any external reducers with internal Redux reducers as we reduce our dependencies on Backbone. 
