import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Header, Footer, VideoBanner } from '~/components';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import quickLinkImageMusic from '~/assets/images/post_banner_music_small.jpg';
import quickLinkImageEntertainment from '~/assets/images/post_banner_entertainment_small.jpg';
import quickLinkImageDaigasso from '~/assets/images/post_banner_daigasso_small.jpg';
import quickLinkImageGamevideo from '~/assets/images/post_banner_gamevideo_small.jpg';

import './Home.scss';

export default function Home()
{
    const [ isVideoBannerLoaded, setVideoBannerLoaded ] = useState<boolean>(false);

    const onVideoBannerLoaded = useCallback(() => {
        setVideoBannerLoaded(true);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ overflow: 'hidden' }}>
            <Header />
            <VideoBanner onLoaded={onVideoBannerLoaded} />
            {isVideoBannerLoaded &&
                <Fragment>
                    <div className='home-enjoy-zone'>
                        <Fade triggerOnce direction='up' delay={500} cascade>
                            <div className='home-enjoy-zone-title'>
                                Wanna <span style={{ fontWeight: 500 }}>Enjoy</span>?
                            </div>
                        </Fade>
                        <div className='home-enjoy-zone-link-container'>
                            <Fade triggerOnce direction='left' delay={700}>
                                <a href={'https://tgv.octopusfantasy.com'} className='home-enjoy-zone-link-button home-enjoy-zone-link-button-left'>
                                    <div className='home-enjoy-zone-link-button-text'>
                                        <div className='home-enjoy-zone-link-button-text-title'>
                                            The Great Venus
                                        </div>
                                        <div className='home-enjoy-zone-link-button-text-description'>
                                            Turn-based RPG based with Ethereum
                                        </div>
                                    </div>
                                </a>
                            </Fade>
                            <Fade triggerOnce direction='right' delay={700}>
                                <a href={'https://mahjong.octopusfantasy.com'} className='home-enjoy-zone-link-button home-enjoy-zone-link-button-right'>
                                    <div className='home-enjoy-zone-link-button-text' style={{ alignItems: 'flex-end' }}>
                                        <div className='home-enjoy-zone-link-button-text-title'>
                                            Octo Mahjong Online
                                        </div>
                                        <div className='home-enjoy-zone-link-button-text-description'>
                                            Web based Riichi Mahjong
                                        </div>
                                    </div>
                                </a>
                            </Fade>
                        </div>
                    </div>
                    <div className='home-quick-link-area'>
                        <div className='home-quick-link-inner'>
                            <div className='home-quick-link-description'>Everything<br/><span style={{ fontWeight: 500 }}>Since 2009.</span><span style={{ fontWeight: 400 }}>.</span>.</div>
                            <div className='home-quick-link-container'>
                                <div className='home-quick-link-row'>
                                    <Link to='/music' className='home-quick-link-button'>
                                        <div className='home-quick-link-button-image' style={{ backgroundImage: `url(${quickLinkImageMusic})` }} />
                                        <div className='home-quick-link-button-name' style={{ background: '#473d80' }}>Music Works</div>
                                    </Link>
                                    <Link to='/entertainment' className='home-quick-link-button'>
                                        <div className='home-quick-link-button-image' style={{ backgroundImage: `url(${quickLinkImageEntertainment})` }} />
                                        <div className='home-quick-link-button-name' style={{ background: '#c16a70' }}>Entertainments</div>
                                    </Link>
                                </div>
                                <div className='home-quick-link-row'>
                                    <Link to='/daigasso' className='home-quick-link-button'>
                                        <div className='home-quick-link-button-image' style={{ backgroundImage: `url(${quickLinkImageDaigasso})` }} />
                                        <div className='home-quick-link-button-name' style={{ background: '#d69739' }}>Daigasso! DX</div>
                                    </Link>
                                    <Link to='/gamevideo' className='home-quick-link-button'>
                                        <div className='home-quick-link-button-image' style={{ backgroundImage: `url(${quickLinkImageGamevideo})` }} />
                                        <div className='home-quick-link-button-name' style={{ background: '#8f3f39' }}>Game Videos</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </Fragment>
            }
        </div>
    );
}
