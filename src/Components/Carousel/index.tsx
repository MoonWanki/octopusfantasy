import React, { useState, useEffect } from 'react';
import { IconButton, Icon } from '@material-ui/core';
import './index.scss';

const DURATION = 15;
const SIZE = 3;

let slidingTimer: NodeJS.Timeout|undefined = undefined;

export default function Carousel()
{
    const [ current, setCurrent ] = useState(0);
    const [ progress, setProgress ] = useState(0);

    useEffect(() => {
        slidingTimer = setTimeout(runProgress, DURATION);
        return () => {
            if(slidingTimer)
            {
                clearTimeout(slidingTimer);
            }
        }
    }, []);

    const toNth = (n: number) => {
        if(slidingTimer)
        {
            clearTimeout(slidingTimer);
        }
        setCurrent(n);
        setProgress(0);
        
        slidingTimer = setTimeout(runProgress, DURATION);
    }

    const runProgress = () => {
        if(progress < 100) {
            setProgress(progress + 0.4);
            slidingTimer = setTimeout(runProgress, DURATION)
        }
        else {
            toNext();
        }
    }

    const toPrev = () => toNth(current===0 ? SIZE - 1 : current - 1);

    const toNext = () => toNth(current < SIZE - 1 ? current + 1 : 0);

    return (
        <div className='carousel'>
            {current==0 && 
                <div className='carousel-item carousel-item-1'>
                    <p className='carousel-item-text carousel-item-text-title'>새로운 PC. <span style={{ fontWeight: 500 }}>새로운 시작.</span></p>
                    <p className='carousel-item-text'>유로트럭 풀옵을 돌리기 위한 그의 부단한 노력.</p>
                </div>
            }
            {current==1 && 
                <div className='carousel-item carousel-item-2'>
                    <p className='carousel-item-text carousel-item-text-title'>文, "경영대학원 <span style={{ fontWeight: 500 }}>사퇴</span> 결정"</p>
                    <p className='carousel-item-text'>4개월 간의 숨가쁜 大장정···끝내 막을 내리다</p>
                </div>
            }
            {current==2 && 
                <div className='carousel-item carousel-item-3'>
                </div>
            }

            <div className='carousel-arrows'>
                <IconButton onClick={toPrev}><Icon style={{ fontSize: 30, color: 'white'}}>navigate_before</Icon></IconButton>
                <IconButton onClick={toNext}><Icon style={{ fontSize: 30, color: 'white'}}>navigate_next</Icon></IconButton>
            </div>
            <div className='carousel-navigator'>
                <div
                    onClick={current===0 ? undefined : () => toNth(0)}
                    className='carousel-navigator-button'
                    style={current===0 ? { opacity: .8 } : { cursor: 'pointer' }} />
                <div
                    onClick={current===1 ? undefined : () => toNth(1)}
                    className='carousel-navigator-button'
                    style={current===1 ? { opacity: .8 } : { cursor: 'pointer' }} />
                <div
                    onClick={current===2 ? undefined : () => toNth(2)}
                    className='carousel-navigator-button'
                    style={current===2 ? { opacity: .8 } : { cursor: 'pointer' }} />
            </div>
            <div className='carousel-progress-bar' style={{ width: `${progress > 100 ? 100 : progress}%` }} />
        </div>
    );
}
