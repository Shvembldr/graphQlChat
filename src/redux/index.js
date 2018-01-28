import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import { routerMiddleware } from 'react-router-redux';
import history from '../history';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history)));

const store = createStore(reducer, enhancer);

export default store;
