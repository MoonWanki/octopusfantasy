import React from 'react';
import Player from 'react-player/lazy';
import video from '~/assets/videos/home_banner_video.mp4';
import { Fade } from 'react-awesome-reveal';
import './index.scss';

export default function VideoBanner()
{
    return (
        <div className='video-banner-wrapper'>
            <Player
                url={video}
                playing={true}
                loop={true}
                muted={true}
                width='100%'
                height=''
            />
            <div className='video-banner-inner'>
                <div className='video-banner-inner-image'></div>
                <Fade triggerOnce direction='up' delay={400}>
                    <a target='_blank' rel='noopener noreferrer' href='https://youtu.be/U1wU3euSLd0'>
                        <p className='video-banner-inner-button'>Watch on <span style={{ fontWeight: 500 }}>YouTube</span></p>
                    </a>
                </Fade>
            </div>
        </div>
    );
}
