import React, { Fragment, useState, useCallback } from 'react'
import { requestSignOut } from '~/api/authApi';
import { ClickAwayListener, Grow, IconButton, Paper, Popper, ListItem, ListItemIcon, ListItemText, Icon, Divider, Avatar, ListItemAvatar } from '@material-ui/core'
import { UserProfile } from '~/types/user';

interface Props
{
    mobile: boolean,
    profile: UserProfile,
}

export default function ProfileMenu(props: Props)
{
    const [ profileMenuOpen, setProfilfeMenuOpen ] = useState<boolean>(false);

    const handleSignOut = useCallback(() => {
        requestSignOut()
        .then(res => {
            window.location.reload();
        }).catch(err => alert(err))
    }, []);

    const handleToggle = useCallback(() => {
        setProfilfeMenuOpen(!profileMenuOpen);
    }, []);
    
    const handleClose = useCallback(() => {
        setProfilfeMenuOpen(false);
    }, []);

    return (
        <div>
            <IconButton
                onClick={handleToggle}
                style={props.mobile ? { width: 30, height: 30, padding: 0, margin: 10 } : { width: 40, height: 40, padding: 0 }} >
                <Avatar alt="profile_image" src={props.profile.profileImage} style={props.mobile ? { width: 30, height: 30 } : { width: 40, height: 40 }}/>
            </IconButton>
            <Popper open={profileMenuOpen} transition disablePortal placement='bottom-end'>
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <Fragment>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="profile_image" src={props.profile.profileImage} />
                                    </ListItemAvatar>
                                    <ListItemText primary={props.profile.nickname} secondary={props.profile.email} style={{ color: 'gray', fontWeight: 500 }} />
                                </ListItem>
                                <Divider />
                                <ListItem button onClick={handleSignOut}>
                                    <ListItemIcon>
                                        <Icon>exit_to_app</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="LOGOUT" />
                                </ListItem>
                            </Fragment>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </div>
    );
}
