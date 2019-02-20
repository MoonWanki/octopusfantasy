import React, { Component } from 'react'
import * as userActions from 'store/modules/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from 'utils/api'
import Avatar from '@material-ui/core/Avatar'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'

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
                    style={{ width: 40, height: 40, padding: 0 }} >
                    <Avatar alt="사진" src={this.props.profile.profileImage} style={{ width: 40, height: 40 }}/>
                </IconButton>
                <Popper open={this.state.profileMenuOpen} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList>
                            <MenuItem onClick={this.handleSignOut}>Logout</MenuItem>
                            </MenuList>
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