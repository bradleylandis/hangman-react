import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const configureStore = () => {
    const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    return createStore(rootReducer, compose(applyMiddleware(thunk), reduxDevTools))
}

export default configureStore();