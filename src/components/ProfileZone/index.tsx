import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { Icon, IconButton, Tooltip } from '@material-ui/core';
import { RootState } from '~/store';

interface Props
{
    mobile: boolean,
}

export default function ProfileZone(props: Props)
{
    const isFetchPending = useSelector((state: RootState) => state.user.fetchStatus.isPending);
    const isFetchSuccess = useSelector((state: RootState) => state.user.fetchStatus.isSuccess);
    const profile = useSelector((state: RootState) => state.user.profile);

    if(isFetchPending)
    {
        return <div style={{ width: 40 }} />;
    }

    if(isFetchSuccess && profile)
    {
        return <ProfileMenu profile={profile} mobile={props.mobile} />;
    }

    if(props.mobile)
    {
        return (
            <IconButton component={Link} to={`/login?url=${encodeURIComponent(window.location.pathname)}`} style={{ margin: 10, padding: 10 }}>
                <Icon style={{ fontSize: 20 }}>power_settings_new</Icon>
            </IconButton>
        );
    }

    return (
        <Link to={`/login?url=${encodeURIComponent(window.location.pathname)}`}>
            <Tooltip disableFocusListener disableTouchListener title="회원가입이 필요 없어요!">
                <p className='nav-item-text' style={{ padding: '4px 16px' }}>LOGIN</p>
            </Tooltip>
        </Link>
    );
}
