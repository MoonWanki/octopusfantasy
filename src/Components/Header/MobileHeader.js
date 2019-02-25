import React, { Component, Fragment } from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { ProfileZone } from 'Components'
import { Link } from 'react-router-dom'
import './MobileHeader.scss'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

export default class MobileHeader extends Component {

    state = {
        sidebarOn: false,
    }

    render() {
        const { sidebarOn } = this.state
        return (
            <Fragment>
                <div className='mobile-header'>
                    <IconButton style={{ margin: 10, padding: 10 }} onClick={() => this.setState({ sidebarOn: !sidebarOn })}>
                        <Icon style={{ fontSize: 20 }} >{sidebarOn ? 'close' : 'menu'}</Icon>
                    </IconButton>
                    <Link to='/'><div className='mobile-header-logo' /></Link>
                    <ProfileZone mobile />
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
                        <ListItem button onClick={() => this.setState({ sidebarOn: false })}>
                            <ListItemIcon>
                                <Icon>music_note</Icon>
                            </ListItemIcon>
                            <ListItemText primary="MUSIC WORKS" secondary="자작곡, 뮤직비디오" />
                        </ListItem>
                    </Link>
                    <Link to='/entertainment'>
                        <ListItem button onClick={() => this.setState({ sidebarOn: false })}>
                            <ListItemIcon>
                                <Icon>video_library</Icon>
                            </ListItemIcon>
                            <ListItemText primary="ENTERTAINMENTS" secondary="각종 UCC 영상 모음" />
                        </ListItem>
                    </Link>
                    <Link to='/daigasso'>
                        <ListItem button onClick={() => this.setState({ sidebarOn: false })}>
                            <ListItemIcon>
                                <Icon>music_video</Icon>
                            </ListItemIcon>
                            <ListItemText primary="DAIGASSO" secondary="대합주! 밴드브라더스 DX 작품 모음" />
                        </ListItem>
                    </Link>
                    <Link to='/gamevideo'>
                        <ListItem button onClick={() => this.setState({ sidebarOn: false })}>
                            <ListItemIcon>
                                <Icon>videogame_asset</Icon>
                            </ListItemIcon>
                            <ListItemText primary="GAME VIDEOS" secondary="각종 게임 플레이 영상" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to='/about'>
                        <ListItem button onClick={() => this.setState({ sidebarOn: false })}>
                            <ListItemIcon>
                                <Icon>info</Icon>
                            </ListItemIcon>
                            <ListItemText primary="ABOUT" />
                        </ListItem>
                    </Link>
                    <Divider />
                </div>
            </Fragment>
        )
    }
}