# ⛑️ Brigade

[![Build Status](https://travis-ci.org/helpscout/brigade.svg?branch=master)](https://travis-ci.org/helpscout/brigade) [![Coverage Status](https://coveralls.io/repos/github/helpscout/brigade/badge.svg?branch=master)](https://coveralls.io/github/%40helpscout%2Fbrigade?branch=master) [![npm version](https://badge.fury.io/js/%40helpscout%2Fbrigade.svg)](https://badge.fury.io/js/loggi)

> Backbone-controlled React components

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is Brigade?](#what-is-brigade)
- [Is Brigade for me?](#is-brigade-for-me)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Documentation](#documentation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is Brigade?

Brigade is a library that enhances Backbone or Marionette views. It provides a
couple of abstractions for:

- Mounting one or more React components into a Backbone or Marionette view
- Keeping React components in sync with Backbone collections and models
- Using actions defined in a Backbone or Marionette view with a React component

## Is Brigade for me?

If you are integrating React components into a legacy Backbone/Marionette
application than Brigade may be a good fit for your project.

If you are simply looking for a state management solution for your React
project, then Brigade is not for you. In this case, try
[MobX](https://www.npmjs.com/package/mobx),
[Redux](https://www.npmjs.com/package/redux),
[Unistore](https://www.npmjs.com/package/unistore) or another solution.

## Dependencies

Brigade has the following peer dependencies:

- [Backbone](https://www.npmjs.com/package/backbone)
- [Marionette](https://www.npmjs.com/package/backbone.marionette) (Optional)
- [React](https://www.npmjs.com/package/react)
- [React DOM](https://www.npmjs.com/package/react-dom)
- [React Redux](https://www.npmjs.com/package/react-redux)
- [Redux](https://www.npmjs.com/package/redux)
- [Redux Thunk](https://www.npmjs.com/package/redux-thunk)

Marionette is optional. Backbone requires jQuery and Underscore.

## Installation

```
npm install @helpscout/brigade
```

## Documentation

- Docs: [https://brigade.netlify.com](https://brigade.netlify.com)
- Storybook: [https://brigade-storybook.netlify.com](https://brigade-storybook.netlify.com)
