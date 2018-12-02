import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { WithStoreAndRouter } from "dw-app-wrapper";
import Routes from "./routes/routes";
import reducers from "./store/reducers";
const ConnectedApp = WithStoreAndRouter({ reducers });

ReactDOM.render(
  <ConnectedApp hasDrawer={true}>
    <Routes />
  </ConnectedApp>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
