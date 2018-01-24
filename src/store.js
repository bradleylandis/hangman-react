import rootReducer from "./reducers";
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}

export default configureStore();