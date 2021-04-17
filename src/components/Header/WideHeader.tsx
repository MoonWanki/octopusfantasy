import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ProfileZone } from '~/components';
import './WideHeader.scss';

export default function WideHeader()
{
    const [ opaque, setOpaque ] = useState<boolean>(window.scrollY > 0);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    const onScroll = useCallback(() => {
            setOpaque(window.scrollY > 0);
    }, []);

    return (
        <div className={opaque ? 'header header-opaque' : 'header'}>
            <div className='header-inner'>
                <div className='header-nav'>
                    <Link to='/'><div className='header-logo' /></Link>
                    <div className='header-nav-item header-nav-item-products'>
                        <p className='nav-item-text'>PRODUCTS</p>
                        <div className='header-menu'>
                            <div className='header-menu-inner'>
                                <div className='header-menu-row'>
                                    <a href='https://tgv.octopusfantasy.com' className='header-menu-item'>
                                        <div className='header-menu-item-colorbox' style={{ background: '#62605d' }} />
                                        <div className='header-menu-item-title'>The Great Venus</div>
                                        <div className='header-menu-item-text'>이더리움 플랫폼 기반 턴제 웹 RPG</div>
                                    </a>
                                    <a href='https://mahjong.octopusfantasy.com' className='header-menu-item'>
                                        <div className='header-menu-item-colorbox' style={{ background: '#62605d' }} />
                                        <div className='header-menu-item-title'>Octo Mahjong Online</div>
                                        <div className='header-menu-item-text'>문어마장 온라인</div>
                                    </a>
                                </div>
                                <div className='header-menu-row'>
                                    <Link to='/music' className='header-menu-item'>
                                        <div className='header-menu-item-colorbox' style={{ background: '#473d80' }} />
                                        <div className='header-menu-item-title'>Music Works</div>
                                        <div className='header-menu-item-text'>자작곡 및 뮤직비디오</div>
                                    </Link>
                                    <Link to='/entertainment' className='header-menu-item'>
                                        <div className='header-menu-item-colorbox' style={{ background: '#c16a70' }} />
                                        <div className='header-menu-item-title'>Entertainments</div>
                                        <div className='header-menu-item-text'>흑역사가 넘쳐나는 UCC 영상들</div>
                                    </Link>
                                    <Link to='/daigasso' className='header-menu-item'>
                                        <div className='header-menu-item-colorbox' style={{ background: '#d69739' }} />
                                        <div className='header-menu-item-title'>Daigasso! DX</div>
                                        <div className='header-menu-item-text'>대합주! 밴드 브라더스 DX 작품 모음</div>
                                    </Link>
                                    <Link to='/gamevideo' className='header-menu-item'>
                                        <div className='header-menu-item-colorbox' style={{ background: '#8f3f39' }} />
                                        <div className='header-menu-item-title'>Game Videos</div>
                                        <div className='header-menu-item-text'>각종 게임 플레이 영상 모음</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to='/about'><div className='header-nav-item'><p className='nav-item-text'>ABOUT</p></div></Link>
                </div>
                <ProfileZone mobile={false} />
            </div>
        </div>
    );
}
