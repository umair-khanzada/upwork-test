import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { createRootReducer, injectReducer } from '../reducers';
import rootSaga from '../sagas';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = composeWithDevTools({
      // Specify name here, actionsBlacklist, actionsCreators
    });
    return process.env.NODE_ENV !== 'test' ?
        composeEnhancers(applyMiddleware(...middleware)) :
        composeEnhancers(applyMiddleware(...middleware, logger));
  }
  return applyMiddleware(...middleware);
};

export default function configureStore() {
  const rootReducer = createRootReducer();
  const store = createStore(rootReducer, bindMiddleware([ sagaMiddleware ]));
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      injectReducer(store, rootReducer);
    });
  }
  const persistor = persistStore(store, undefined, () => {
    store.getState();
  });
  return { store, persistor };
}
