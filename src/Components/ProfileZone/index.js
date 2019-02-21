import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

export class ProfileZone extends Component {

	render() {
		// before fetch profile
		if(this.props.isPending) {
			return <div style={{ width: 40 }} />
		}
		// if signed in
		else if(this.props.isSignedIn) {
			return <ProfileMenu profile={this.props.profile} mobile={this.props.mobile} />
		}
		// if not signed in
		else {
			if(this.props.mobile) { // mobile: power button
				return <IconButton component={Link} to={`/login?url=${encodeURIComponent(window.location.pathname)}`} style={{ margin: 10, padding: 10 }}><Icon style={{ fontSize: 20 }}>power_settings_new</Icon></IconButton>
			}
			else { // desktop: login box
				return (
					<Link to={`/login?url=${encodeURIComponent(window.location.pathname)}`}>
						<Tooltip disableFocusListener disableTouchListener title="회원가입이 필요 없어요!">
							<p className='nav-item-text' style={{ padding: '4px 16px' }}>LOGIN</p>
						</Tooltip>
					</Link>
				)
			}
		}
	}
}

export default connect((state) => ({
	isSignedIn: state.user.isSignedIn,
	isPending: state.user.isPending,
	profile: state.user.profile,
}))(ProfileZone)
