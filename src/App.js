import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Home from './Containers/Home'
import Login from './Containers/Login'
import About from './Containers/About'
import PostListContainer from './Containers/PostListContainer'

export default class App extends Component {

	render() {
		console.log('App rendered')
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/about" component={About} />
						<Route path="/post" component={PostListContainer} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
  }