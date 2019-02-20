import React, { Component, Fragment } from 'react'
import Sidebar from './Sidebar'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { ProfileZone } from 'Components'
import { Link } from 'react-router-dom'
import './MobileHeader.scss'

export default class MobileHeader extends Component {

    state = {
        sidebarOn: false,
    }

    render() {
        const { sidebarOn } = this.state
        return (
            <Fragment>
                <div className='mobile-header'>
                    <IconButton style={{ margin: 5, padding: 10 }} onClick={() => this.setState({ sidebarOn: !sidebarOn })}>
                        <Icon style={{ fontSize: 20 }} >{sidebarOn ? 'close' : 'menu'}</Icon>
                    </IconButton>
                    <Link to='/'><div className='mobile-header-logo' /></Link>
                    <ProfileZone mobile />
                </div>
                <div className='sidebar' style={{ left: sidebarOn ? 0 : '-100%' }}>
                    <Sidebar />
                </div>
            </Fragment>
        )
    }
}