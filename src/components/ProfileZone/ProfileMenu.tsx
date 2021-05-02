import React, { Fragment, useState, useCallback, useRef, useEffect } from 'react'
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
    const [ isProfileMenuOpened, setProfilfeMenuOpened ] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleSignOut = useCallback(() => {
        requestSignOut()
        .then(res => {
            window.location.reload();
        }).catch(err => alert(err))
    }, []);

    const handleToggle = useCallback(() => {
        setProfilfeMenuOpened(!isProfileMenuOpened);
    }, [isProfileMenuOpened]);
    
    const handleClose = useCallback((event: React.MouseEvent<EventTarget>) => {
        console.log('handleClose() calloed')
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement))
        {
            return;
        }
        setProfilfeMenuOpened(false);
    }, []);

    const prevOpen = useRef(isProfileMenuOpened);

    useEffect(() => {
        if (prevOpen.current == true && isProfileMenuOpened == false)
        {
          anchorRef.current!.focus();
        }
        prevOpen.current = isProfileMenuOpened;
    }, [isProfileMenuOpened]);

    return (
        <div>
            <IconButton
                ref={anchorRef}
                aria-controls={isProfileMenuOpened ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                style={props.mobile ? { width: 30, height: 30, padding: 0, margin: 10 } : { width: 40, height: 40, padding: 0 }} >
                <Avatar alt="profile_image" src={props.profile.profileImage} style={props.mobile ? { width: 30, height: 30 } : { width: 40, height: 40 }}/>
            </IconButton>
            <Popper open={isProfileMenuOpened} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <div id='menu-list-grow'>
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
                            </div>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </div>
    );
}
