import React, { Component } from 'react'
import './index.scss'

import { IconButton, Icon } from '@material-ui/core'

import carouselImage1 from 'images/carousel_1.jpg'
import carouselImage2 from 'images/carousel_2.jpg'
import carouselImage3 from 'images/carousel_3.jpg'

import Fade from 'react-reveal/Fade'

const duration = 15

let slidingTimer = null

export default class Carousel extends Component {

    state = {
        current: 0,
        progress: 0,
    }

    carouselItems = [
        <Fade opposite when={this.state.current===0}>
            <div className='carousel-item' style={{ backgroundImage: `url(${carouselImage1})`}}>
                <p className='carousel-item-text carousel-item-text-title'>새로운 PC. <span style={{ fontWeight: 500 }}>새로운 시작.</span></p>
                <p className='carousel-item-text'>유로트럭 풀옵을 돌리기 위한 그의 부단한 노력.</p>
            </div>
        </Fade>,
        <Fade opposite when={this.state.current===1}>
            <div className='carousel-item' style={{ backgroundImage: `url(${carouselImage2})`}}>
                <p className='carousel-item-text carousel-item-text-title'>文, "경영대학원 <span style={{ fontWeight: 500 }}>사퇴</span> 결정"</p>
                <p className='carousel-item-text'>4개월 간의 숨가쁜 大장정···끝내 막을 내리다</p>
            </div>
        </Fade>,
        <Fade opposite when={this.state.current===2}>
            <div className='carousel-item' style={{ backgroundImage: `url(${carouselImage3})`}}>
            </div>
        </Fade>,
    ]

    componentDidMount() {
        slidingTimer = setTimeout(this.runProgress, duration)
    }

    componentWillUnmount() {
        clearTimeout(slidingTimer)
    }

    runProgress = () => {
        if(this.state.progress < 100) {
            this.setState({ progress: this.state.progress + 0.4 }, () => {slidingTimer = setTimeout(this.runProgress, duration)})
        }
        else {
            this.toNext()
        }
    }

    toPrev = () => this.toNth(this.state.current===0 ? this.carouselItems.length - 1 : this.state.current - 1)

    toNext = () => this.toNth(this.state.current < this.carouselItems.length - 1 ? this.state.current + 1 : 0)
    
    toNth = n => {
        clearTimeout(slidingTimer)
        this.setState({ current: n, progress: 0 })
        
        slidingTimer = setTimeout(this.runProgress, duration)
    }

    render() {
        return (
            <Fade duration={800}>
                <div className='carousel'>
                    
                    <Fade opposite when={this.state.current===0} duration={800}>
                        <div className='carousel-item' style={{ backgroundImage: `url(${carouselImage1})`}}>
                            <Fade bottom opposite when={this.state.current===0} duration={800}><p className='carousel-item-text carousel-item-text-title'>새로운 PC. <span style={{ fontWeight: 500 }}>새로운 시작.</span></p></Fade>
                            <Fade bottom opposite when={this.state.current===0} duration={800}><p className='carousel-item-text'>유로트럭 풀옵을 돌리기 위한 그의 부단한 노력.</p></Fade>
                        </div>
                    </Fade>,
                    <Fade opposite when={this.state.current===1} duration={800}>
                        <div className='carousel-item' style={{ backgroundImage: `url(${carouselImage2})`}}>
                            <Fade bottom opposite when={this.state.current===1} duration={800}><p className='carousel-item-text carousel-item-text-title'>文, "경영대학원 <span style={{ fontWeight: 500 }}>사퇴</span> 결정"</p></Fade>
                            <Fade bottom opposite when={this.state.current===1} duration={800}><p className='carousel-item-text'>4개월 간의 숨가쁜 大장정···끝내 막을 내리다</p></Fade>
                        </div>
                    </Fade>,
                    <Fade opposite when={this.state.current===2} duration={800}>
                        <div className='carousel-item' style={{ backgroundImage: `url(${carouselImage3})`}}>
                        </div>
                    </Fade>,

                    <div className='carousel-arrows'>
                        <IconButton onClick={this.toPrev}><Icon style={{ fontSize: 30, color: 'white'}}>navigate_before</Icon></IconButton>
                        <IconButton onClick={this.toNext}><Icon style={{ fontSize: 30, color: 'white'}}>navigate_next</Icon></IconButton>
                    </div>

                    <div className='carousel-navigator'>
                        {this.carouselItems.map((_, i) =>
                            <div
                                key={i}
                                onClick={this.state.current===i ? null : () => this.toNth(i)}
                                className='carousel-navigator-button'
                                style={this.state.current===i ? { opacity: 0.8 } : { cursor: 'pointer' }} />
                        )}
                    </div>

                    <div className='carousel-progress-bar' style={{ width: `${this.state.progress > 100 ? 100 : this.state.progress}%` }} />
                </div>
            </Fade>
        )
    }
}
