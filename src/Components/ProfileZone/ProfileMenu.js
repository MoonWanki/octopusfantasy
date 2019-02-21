import React, { Component } from 'react'
import * as userActions from 'store/modules/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from 'utils/api'
import { ClickAwayListener, Grow, IconButton, Paper, Popper, ListItem, ListItemIcon, ListItemText, Icon, Divider, Avatar, ListItemAvatar } from '@material-ui/core'

class ProfileMenu extends Component {

    state = {
        profileMenuOpen: false,
    }

    handleSignOut = () => {
        signOut()
        .then(res => {
            window.location.reload()
        }).catch(err => alert(err))
    }

    handleToggle = () => {
        this.setState(state => ({ profileMenuOpen: !state.profileMenuOpen }))
    }
    
    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return
        }
    
        this.setState({ profileMenuOpen: false })
    }

    render() {
        return (
            <div>
                <IconButton
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={this.state.profileMenuOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    style={this.props.mobile ? { width: 30, height: 30, padding: 0, margin: 10 } : { width: 40, height: 40, padding: 0 }} >
                    <Avatar alt="profile_image" src={this.props.profile.profileImage} style={this.props.mobile ? { width: 30, height: 30 } : { width: 40, height: 40 }}/>
                </IconButton>
                <Popper open={this.state.profileMenuOpen} anchorEl={this.anchorEl} transition disablePortal placement='bottom-end'>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt="profile_image" src={this.props.profile.profileImage} />
                                </ListItemAvatar>
                                <ListItemText primary={this.props.profile.nickname} secondary={this.props.profile.email} style={{ color: 'gray', fontWeight: 500 }} />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={this.handleSignOut}>
                                <ListItemIcon>
                                    <Icon>exit_to_app</Icon>
                                </ListItemIcon>
                                <ListItemText primary="LOGOUT" />
                            </ListItem>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
            </div>
        )
    }
}

export default connect(null, dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
}))(ProfileMenu)