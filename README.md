# dw-create-react-redux-router-app

## Installation
Fork of create-react-redux-router with a antd template and added custom scripts.

Install it once, globally
```
npm install -g dw-create-react-redux-router-app
```
\*`dw-create-react-redux-router-app` relies on `create-react-app` which will need to be installed separately. Instructions can be found [here](https://github.com/facebookincubator/create-react-app).

## Creating a new app

To create a new app, run
```
dw-create-react-redux-router-app my-app-name
```
To create a new model in app, run 
```
dw-create-react-redux-router-app --add-store-item newModel
```

## What this package is:

##### A thin wrapper around `create-react-app`
This project is a thin wrapper around Facebook's [create-react-app](https://github.com/facebookincubator/create-react-app) but adds the following common libraries needed for most medium to large-sized web apps:

- [redux](http://redux.js.org/)
- [react-redux](https://github.com/reactjs/react-redux)
- [react-router](https://github.com/ReactTraining/react-router)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [redux-thunk](https://github.com/gaearon/redux-thunk)

## What this package is not:

##### A replacement for `create-react-app`
This project is not a replacement for `create-react-app`, but rather a thin wrapper around it. Apps created using this project are not ejected out of `create-react-app` and can still be upgraded to newer versions of `react-scripts` as needed. This project also includes all the same scripts included with `create-react-app` for running a development server and building production versions.

##### A full-stack solution
`dw-create-react-redux-router-app` makes no assumptions about the backend of your app. This project is opinionated, however, about the packages you should use for state-management and url routing.

## What you get?

`dw-create-react-redux-router-app` not only installs the latest versions of the above-described packages, but also overwrites some of the default template files included with `create-react-app`, specifically:

- [App.js](https://github.com/chrisjpatty/create-react-redux-router-app/blob/master/templates/App.js) - imports a `connect()` function from `react-redux` and connects `<App />` to the Redux store.
- [index.js](https://github.com/chrisjpatty/create-react-redux-router-app/blob/master/templates/index.js) - This file wraps the `<App/>` component included with `create-react-app` in the `<Provider/>` component imported from `react-redux`, and the `<BrowserRouter/>` component imported from `react-router-dom`.
- [store.js](https://github.com/chrisjpatty/create-react-redux-router-app/blob/master/templates/store.js) - This file imports `createStore()` from `redux` and exports as the default export a Redux store with a basic reducer.

## Why is the name so horribly long?

Because you'll save so much time not having to write boilerplate code to setup your state management and routing that you can afford the extra characters in your terminal command.

Also it's descriptive.
