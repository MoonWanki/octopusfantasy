import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LoginButton extends Component {
	render() {
		return (
			<div>
				<Link to={`/login?url=${encodeURIComponent(window.location.pathname)}`}>
					<h3>LOGIN</h3>
				</Link>
			</div>
		)
	}
}
