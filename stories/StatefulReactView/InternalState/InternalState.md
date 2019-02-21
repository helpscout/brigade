# Internal State

When building Agent Chat, we discovered a very useful pattern for managing a complex React-Redux application nested within a larger Marionette application. Most of the stateful information for the Chat App lives inside redux, but there are some key pieces of state which live in the parent Marionette Application, as well as a number of callbacks and resources which the Chat App needs to function.

Due to the slowness of our awful Karma test harness at the time, we wrote Agent Chat in such a way that it could run independently from the rest of the Mailbox. This constraint actually _forced_ us to find a way to completely segregate the Chat application logic from the parent app, whose logic it could not directly import.

## The Strategy

To achieve a loosely coupled, highly cohesive solution with an explicit contract between the two frameworks, we adopted the following strategy:

- Redux `store` is created outside the React application, in the Marionette App
- The `store` is passed into a View which renders the `<ChatApp/>` wrapped in a `Provider`, with the pre-created `store`
- Marionette-derived stateful information is passed in as `preloadedState` to the Redux store
- Special utilities like `pusherClient`, the Router's `navigate` method or callbacks like our Error noty are exposed to the Chat App using `thunk.withExtraArgument({ pusherClient, navigate })` middleware.

  - This piece is critical because it allows all of our references to the parent application to be confined to our stateless, easily-mocked action creators.
  - thunk's `extraArgument` lets us inject external dependencies straight into our action-creators
  - For example:

```
  // actions/chat.js

  // flashError exposes HS.Plugins.Flash.error()
  export const fetchChat = id => (dispatch, getState, { flashError }) => {
    fetchChat(id)
      .catch(error => flashError(error))
  }

```

## This Example

This example shows a case where initial `preloadedState` is provided in the parent application, but subsequently all application state logic lives inside React/Redux. This stands in contrast to the External State example, where state lives in Backbone Models/Collections and is injected into the store, and manually kept up to date with the use of `externalStateReducers`.
