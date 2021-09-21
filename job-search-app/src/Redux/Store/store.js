import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../Reducers/index'
import thunk from "redux-thunk";
import initialState from "../initialState"

// 3 arguments for createStore:
// 1) primary reducer
// 2) initial state of the app
// 3) middlewares/plugins

const configureStore = createStore(
  reducers,
  initialState,
  process.env.REACT_APP_DEVELOPMENT
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
)

export default configureStore