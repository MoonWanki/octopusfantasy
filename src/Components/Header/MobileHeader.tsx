import React, { Fragment, useState } from 'react';
import { Icon, IconButton, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { ProfileZone } from '~/components';
import { Link } from 'react-router-dom';
import './MobileHeader.scss';

export default function MobileHeader()
{
    const [ sidebarOn, setSidebarOn ] = useState(false);

    return (
        <Fragment>
            <div className='mobile-header'>
                <IconButton style={{ margin: 10, padding: 10 }} onClick={() => setSidebarOn(!sidebarOn)}>
                    <Icon style={{ fontSize: 20 }} >{sidebarOn ? 'close' : 'menu'}</Icon>
                </IconButton>
                <Link to='/'><div className='mobile-header-logo' /></Link>
                <ProfileZone mobile={true} />
            </div>
            <div className='mobile-header-drawer' style={{ top: sidebarOn ? 44 : '-140%' }}>
                <Divider />
                <ListItem button component="a" href="https://tgv.octopusfantasy.com">
                    <ListItemIcon>
                        <Icon>open_in_new</Icon>
                    </ListItemIcon>
                    <ListItemText primary="The Great Venus 바로가기" />
                </ListItem>
                <ListItem button component="a" href="https://mahjong.octopusfantasy.com">
                    <ListItemIcon>
                        <Icon>open_in_new</Icon>
                    </ListItemIcon>
                    <ListItemText primary="문어마장 온라인 바로가기" />
                </ListItem>
                <Divider />
                <Link to='/music'>
                    <ListItem button onClick={() => setSidebarOn(false)}>
                        <ListItemIcon>
                            <Icon>music_note</Icon>
                        </ListItemIcon>
                        <ListItemText primary="MUSIC WORKS" secondary="자작곡 및 뮤직비디오" />
                    </ListItem>
                </Link>
                <Link to='/entertainment'>
                    <ListItem button onClick={() => setSidebarOn(false)}>
                        <ListItemIcon>
                            <Icon>video_library</Icon>
                        </ListItemIcon>
                        <ListItemText primary="ENTERTAINMENTS" secondary="흑역사가 넘쳐나는 UCC 영상들" />
                    </ListItem>
                </Link>
                <Link to='/daigasso'>
                    <ListItem button onClick={() => setSidebarOn(false)}>
                        <ListItemIcon>
                            <Icon>music_video</Icon>
                        </ListItemIcon>
                        <ListItemText primary="DAIGASSO" secondary="대합주! 밴드브라더스 DX 작품 모음" />
                    </ListItem>
                </Link>
                <Link to='/gamevideo'>
                    <ListItem button onClick={() => setSidebarOn(false)}>
                        <ListItemIcon>
                            <Icon>videogame_asset</Icon>
                        </ListItemIcon>
                        <ListItemText primary="GAME VIDEOS" secondary="각종 게임 플레이 영상 모음" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to='/about'>
                    <ListItem button onClick={() => setSidebarOn(false)}>
                        <ListItemIcon>
                            <Icon>info</Icon>
                        </ListItemIcon>
                        <ListItemText primary="ABOUT" />
                    </ListItem>
                </Link>
                <Divider />
            </div>
        </Fragment>
    );
}
