import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducers from './reducers';
import { injectStore } from '../utils/axios';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export const store = createStore(reducers, applyMiddleware(...middlewares));

injectStore(store);
