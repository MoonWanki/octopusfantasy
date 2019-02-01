import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from 'store/modules/user'

import Home from 'Containers/Home'
import Login from 'Containers/Login'
import About from 'Containers/About'
import PostListContainer from 'Containers/PostListContainer'
import LoginCallback from 'Containers/LoginCallback';

class App extends Component {

	componentDidMount = () => {
		this.props.UserActions.fetchUser()
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/about" component={About} />
					<Route path="/post" component={PostListContainer} />
					<Route path="/callback" component={LoginCallback} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default connect(null, dispatch => ({
	UserActions: bindActionCreators(userActions, dispatch)
}))(App)
