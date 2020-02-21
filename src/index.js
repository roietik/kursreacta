// import React, { createContext } from "react";
import React from "react";
import { composeWithDevTools } from "redux-devtools-extension";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import "./App.scss";
import { timeboxesReducer } from ".//reducers";

const store = createStore(timeboxesReducer, composeWithDevTools());
// store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
