import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducers from './reducers';
import { injectStore } from '../utils/axios';
import Reactotron from '../../ReactotronConfig';

const middlewares = [thunk];

// if (process.env.NODE_ENV === `development`) {
//   middlewares.push(logger);
// }

export const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()),
);

injectStore(store);
