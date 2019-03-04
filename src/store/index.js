import { createStore, applyMiddleware } from 'redux'
import modules from './modules'
import reduxPromiseMiddleware from 'redux-promise-middleware'

let middlewares = [ reduxPromiseMiddleware ]
if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger')
    middlewares = [ ...middlewares, createLogger() ]
}

export default createStore(modules, applyMiddleware(...middlewares))
