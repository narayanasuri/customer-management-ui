import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import customerReducer from './customer/customerReducers';

// Creation of the Redux Store
const store = createStore(
    customerReducer,
    // Compose function to club enhancers
    compose(
        // Middleware Thunk for making async calls
        applyMiddleware(
            thunk
        ),
        // Debugger for chrome devtools
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;