import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from 'store/modules/user'

import Home from 'Layout/Home'
import Login from 'Layout/Login'
import About from 'Layout/About'
import PostScroller from 'Layout/PostScroller'
import LoginCallback from 'Layout/LoginCallback'
import NotFound from 'Layout/NotFound'

class App extends Component {

	componentDidMount = () => {
		this.props.UserActions.fetchUser()
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" 			component={Home} />
					<Route path="/login" 			component={Login} />
					<Route path="/about" 			component={About} />
					<Route path="/callback" 		component={LoginCallback} />

					<Route path="/music" 			render={() => <PostScroller type='music'/>} />
					<Route path="/entertainment" 	render={() => <PostScroller type='entertainment'/>} />
					<Route path="/daigasso" 		render={() => <PostScroller type='daigasso'/>} />
					<Route path="/gamevideo" 		render={() => <PostScroller type='gamevideo'/>} />
					<Route path="/post/:pid" 		component={PostScroller} />

					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default connect(null, dispatch => ({
	UserActions: bindActionCreators(userActions, dispatch)
}))(App)
