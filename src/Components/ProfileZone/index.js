import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginPageButton from './LoginPageButton'
import ProfileCard from './ProfileCard'

export class ProfileZone extends Component {

	render() {
		if(this.props.isPending) {
			return null
		} else if(this.props.isSignedIn) {
			return (
				<ProfileCard profile={this.props.profile} />
			)
		} else {
			return (
				<LoginPageButton />
			)
		}
	}
}

export default connect((state) => ({
	isSignedIn: state.user.isSignedIn,
	isPending: state.user.isPending,
	profile: state.user.profile,
}))(ProfileZone)
