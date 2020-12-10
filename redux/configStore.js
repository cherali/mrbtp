import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/rootReducers'

import sagas from './sagas'


export const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const storeEnhancers = [middlewareEnhancer]

  const composedEnhancer = compose(
    ...storeEnhancers
  )


  // create store
  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  )

  // run sagas
  store.sagaTask = sagaMiddleware.run(sagas)

  return store
};
