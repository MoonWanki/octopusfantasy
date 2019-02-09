import { createStore, applyMiddleware } from 'redux'
import modules from './modules'
import { createLogger } from 'redux-logger'
//import reduxThunk from 'redux-thunk'
import reduxPromiseMiddleware from 'redux-promise-middleware'

export default createStore(modules, applyMiddleware(createLogger(), /*reduxThunk,*/ reduxPromiseMiddleware))
