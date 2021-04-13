import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxLogger from 'redux-logger'; // should be the latest element
import reduxThunk from 'redux-thunk';
import user from './reducers/user';

const rootReducer = combineReducers({
    user,
});

let middlewares: Array<Middleware> = [ reduxThunk ];

if (process.env.NODE_ENV == 'development')
{
    middlewares = [ ...middlewares, reduxLogger ]
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
