import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./App";
import "./App.scss";
import { timeboxesReducer } from ".//reducers";

export const StoreContext = createContext({ store: null });
const store = createStore(timeboxesReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
