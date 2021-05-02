import React, { useState, useCallback } from 'react';
import Player from 'react-player/lazy';
import video from '~/assets/videos/home_banner_video.mp4';
import { Fade } from 'react-awesome-reveal';
import { Loading } from '~/components';
import './index.scss';

interface Props
{
    onLoaded?: () => void,
}

export default function VideoBanner({ onLoaded }: Props)
{
    const [ isVideoBufferEnd, setVideoBufferEnd ] = useState<Boolean>(false);

    const onVideoBufferEnd = useCallback(() => {
        setVideoBufferEnd(true);
        if(onLoaded != undefined)
        {
            onLoaded();
        }
    }, []);

    return (
        <div className='video-banner-wrapper'>
            <Player
                url={video}
                playing={true}
                loop={true}
                muted={true}
                width='100%'
                height=''
                onBufferEnd={onVideoBufferEnd}
                fallback={<Loading message='홈 화면을 로딩 중입니다...' />}
            />
            {isVideoBufferEnd &&
                <div className='video-banner-inner'>
                    <div className='video-banner-inner-image'></div>
                    <Fade triggerOnce direction='up' delay={400}>
                        <a target='_blank' rel='noopener noreferrer' href='https://youtu.be/U1wU3euSLd0'>
                            <p className='video-banner-inner-button'>Watch on <span style={{ fontWeight: 500 }}>YouTube</span></p>
                        </a>
                    </Fade>
                </div>
            }
        </div>
    );
}
