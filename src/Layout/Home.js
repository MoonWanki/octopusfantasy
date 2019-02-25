import React, { Component } from 'react'
import { Header, Carousel, Footer } from 'Components'
import { Link } from 'react-router-dom'
import './Home.scss'

class Home extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <div>
                <Header />
                <Carousel />
                <div className='home-quick-link'>
                    <Link to='/music' className='home-quick-link-item' style={{ background: '#473d80'}}>
                        <span className='home-quick-link-item-text'>MUSIC WORKS</span>
                    </Link>
                    <Link to='/entertainment' className='home-quick-link-item' style={{ background: '#c16a70'}}>
                        <span className='home-quick-link-item-text'>ENTERTAINMENTS</span>
                    </Link>
                    <Link to='/daigasso' className='home-quick-link-item' style={{ background: '#d69739'}}>
                    <   span className='home-quick-link-item-text'>DAIGASSO! DX</span>
                    </Link>
                    <Link to='/gamevideo' className='home-quick-link-item' style={{ background: '#8f3f39'}}>
                        <span className='home-quick-link-item-text'>GAME VIDEOS</span>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }
};

export default Home;
