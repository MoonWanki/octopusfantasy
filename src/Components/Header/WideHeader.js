import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './WideHeader.scss'
import { ProfileZone } from 'Components'

export default class WideHeader extends Component {
    
    state = {
        opaque: window.scrollY > 0,
    }

    componentDidMount() {
        window.onscroll = this.onScroll
    }

    onScroll = () => this.setState({ opaque: window.scrollY > 0 })

    render() {
        return (
            <div className={this.state.opaque ? 'wide-header wide-header-opaque' : 'wide-header'}>
                <div className='wide-header-inner'>
                    <div style={{ display: 'flex' }}>
                        <Link to='/'><div className='wide-header-logo' /></Link>
                    </div>
                    <ProfileZone />
                </div>
            </div>
        )
    }
}
