<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Brigade](#brigade)
  - [What is Brigade?](#what-is-brigade)
  - [Is Brigade for me?](#is-brigade-for-me)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Brigade

[![Build Status](https://travis-ci.org/helpscout/brigade.svg?branch=master)](https://travis-ci.org/helpscout/brigade) [![Coverage Status](https://coveralls.io/repos/github/helpscout/brigade/badge.svg?branch=master)](https://coveralls.io/github/helpscout/brigade?branch=master)

> Backbone-controlled React components

## What is Brigade?

Brigade is a library that enhances Backbone/Marionette views providing
consumers with a declarative interface to:

- Mount one or more React components into a Backbone/Marionette view.
- Syncronize the React components with the state of Backbone models.
- Reduce synchronized state to the props that your React components require.

## Is Brigade for me?

If you are integrating React components into a legacy Backbone/Marionette
application than Brigade may be a good fit for your project.

If you are simply looking for a state management solution for your React
project, then Brigade is not for you. In this case, try
[Redux](https://www.npmjs.com/package/redux),
[MobX](https://www.npmjs.com/package/mobx) or one of many more solutions.

## Dependencies

Brigade has the following peer dependencies:

- [Backbone](https://www.npmjs.com/package/backbone)
- [Cocktail](https://www.npmjs.com/package/backbone.cocktail)
- [Marionette](https://www.npmjs.com/package/backbone.marionette) (Optional)
- [React](https://www.npmjs.com/package/react)
- [React DOM](https://www.npmjs.com/package/react-dom)

Backbone requires jQuery and Underscore.

## Installation

```
npm install @helpscout/brigade
```

## Usage

Create a Backbone or Marionette view and add a components property. The
components property should be a set of key-value pairs, where the key is
a `selector` and the value is a `builder` function.

The `selector` should correspond to an element in your Backbone/Marionette
view's template. This is where there component returned from the `builder`
function will be mounted.

For the builder function, it is important that you do not use an anonymous
function as the function will be executed in the incorrect context.

The builder function you supply can return one of two types:

1. A valid React element.
2. An object with a `component` key, an optional `data` key, and an
   optional `selector` key.

The `component` should be a valid React component and may contain props which
will be preserved unless they are overridden.

The `data` should be set of key-value pairs. By default, the data is spread as
props to the component and it will be merged with the component props.

You may include Backbone models in the data. This is what makes it interesting.
`.toJSON()` is called on Backbone models before passing them as props. Also,
the Backbone models are subscribed to for changes and on change, they will
update store, resulting in the component receiving new props. In this way, the
React component can be automatically kept in sync with the model.

The `data` can include more than one model. You can also mixin other
values into `data`. On its own, that is not interesting, since you can pass
props to the component, but it is interesting when a `selector` function is
provided.

The `selector` function takes `data` (with models cast to JSON) as its
argument and returns a new set of key-value pairs. This allows you to reduce
the `data` to the specific props required of the component, as well as to include
computed or derived data, that may or may not dependent on other values found in
the `data`.

That may be a lot to take in, so an example may prove helpful:

```
const FormView = Marionette.View.extend({
  components: {
    "#form": function() {
      return {
        component: <Form onChange={this.handleChange} onSubmit={this.handleSubmit} />,
        data: { person: this.model }
      };
    },
    "#header": function() {
      return {
        component: <Header />,
        data: { person: this.model },
        selector: ({ person }) => {
          const { firstName, lastName, email } = person;
          const name = `${firstName} ${lastName}`.trim();
          let title;
          if (name && email) {
            title = `${name} (${email})`;
          } else if (name) {
            title = name;
          } else if (email) {
            title = email;
          } else {
            title = "Unknown Person";
          }
          return { title };
        }
      };
    }
  },

  handleChange(key, value) {
    this.model.set(key, value);
  },

  handleSubmit() {
    this.model.save();
  },

  initialize() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  },

  model: new Backbone.Model({
    firstName: "",
    lastName: "",
    email: ""
  }),

  template: _.template(`
    <section>
      <header id="header">
      </header>
      <div>
        <div id="form"></div>
      </div>
    </section>
  `)
```

In the above example, you will note that two React components are mounted.
Both components watch for changes to the model. The `Form` component recieves
the person model cast as JSON as its prop. The `Header` component receives the
`title` string as its prop, which is return value of the `selector` it is
provided.

You will also notice that the form component receives two actions as props
which are used to interact with the model.

To make all of this work, we need only call the `brigade` function on the
view.

```
import brigade from "@helpscout/brigade";

...

brigade(FormView);
```
