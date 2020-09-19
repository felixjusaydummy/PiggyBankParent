import { createStore, applyMiddleware  } from 'redux';
import * as rex  from  './reducers/index';

const Store = createStore(rex.rootReducer, applyMiddleware(rex.middleware));
export default Store;