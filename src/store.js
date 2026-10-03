// store.js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./components/reducers/rootReducer"; // Import the root reducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
