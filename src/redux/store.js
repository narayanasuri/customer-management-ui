import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import customerReducer from './customer/customerReducers';

// Creation of the Redux Store
const store = createStore(
  customerReducer,
  // Compose function to club enhancers
  compose(
    // Middleware Thunk for making async calls
    applyMiddleware(thunk)
  )
);

export default store;
