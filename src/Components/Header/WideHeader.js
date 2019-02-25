import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './WideHeader.scss'
import { ProfileZone } from 'Components'

export default class WideHeader extends Component {
    
    state = {
        opaque: window.scrollY > 0,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll)
    }

    onScroll = () => this.setState({ opaque: window.scrollY > 0 })

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }

    render() {
        return (
            <div className={this.state.opaque ? 'wide-header wide-header-opaque' : 'wide-header'}>
                <div className='wide-header-inner'>
                    <div className='wide-header-nav' style={{  }}>
                        <Link to='/'><div className='wide-header-logo' /></Link>
                        <div className='wide-header-nav-item wide-header-nav-item-products'>
                            <p className='nav-item-text'>PRODUCTS</p>
                            <div className='wide-header-products-menu'>
                                <div className='wide-header-products-menu-inner'>
                                    <div className='wide-header-products-menu-row'>
                                        <a href='https://tgv.octopusfantasy.com' className='wide-header-products-menu-row-item'>
                                            The Great Venus
                                        </a>
                                        <a href='https://mahjong.octopusfantasy.com' className='wide-header-products-menu-row-item'>
                                            Octo Mahjong Online
                                        </a>
                                    </div>
                                    <div className='wide-header-products-menu-row'>
                                        <Link to='/music' className='wide-header-products-menu-row-item'>
                                            Music Works
                                        </Link>
                                        <Link to='/entertainment' className='wide-header-products-menu-row-item'>
                                            Entertainments
                                        </Link>
                                        <Link to='/daigasso' className='wide-header-products-menu-row-item'>
                                            Daigasso! DX
                                        </Link>
                                        <Link to='/gamevideo' className='wide-header-products-menu-row-item'>
                                            Game Videos
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to='/about'><div className='wide-header-nav-item'><p className='nav-item-text'>ABOUT</p></div></Link>
                    </div>
                    <ProfileZone />
                </div>
            </div>
        )
    }
}
