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

    componentWillUnmount() {
        window.onscroll = null
    }

    render() {
        return (
            <div className={this.state.opaque ? 'wide-header wide-header-opaque' : 'wide-header'}>
                <div className='wide-header-inner'>
                    <div className='wide-header-nav' style={{  }}>
                        <Link to='/'><div className='wide-header-logo' /></Link>
                        <div className='wide-header-nav-item wide-header-nav-item-products'>
                            <p className='nav-item-text'>PRODUCTS</p>
                            <div className='wide-header-products-menu' />
                        </div>
                        <Link to='/about'><div className='wide-header-nav-item'><p className='nav-item-text'>ABOUT</p></div></Link>
                    </div>
                    <ProfileZone />
                </div>
            </div>
        )
    }
}
