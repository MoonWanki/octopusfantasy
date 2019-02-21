import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from 'store/modules/user'

import Home from 'Layout/Home'
import Login from 'Layout/Login'
import About from 'Layout/About'
import PostContainer from 'Layout/PostContainer'
import LoginCallback from 'Layout/LoginCallback'

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
					<Route path="/post" component={PostContainer} />
					<Route path="/callback" component={LoginCallback} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default connect(null, dispatch => ({
	UserActions: bindActionCreators(userActions, dispatch)
}))(App)
