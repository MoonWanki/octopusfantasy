import React, { Component } from 'react'
import { IconButton, Icon } from '@material-ui/core'
import Fade from 'react-reveal/Fade'
import './index.scss'

const duration = 15
const size = 3

let slidingTimer = null

export default class Carousel extends Component {

    state = {
        current: 0,
        progress: 0,
    }

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

    toPrev = () => this.toNth(this.state.current===0 ? size - 1 : this.state.current - 1)

    toNext = () => this.toNth(this.state.current < size - 1 ? this.state.current + 1 : 0)
    
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
                        <div className='carousel-item' style={{ backgroundImage: `url(${require('images/carousel_1.jpg')})`}}>
                            <Fade bottom opposite when={this.state.current===0} duration={800}><p className='carousel-item-text carousel-item-text-title'>새로운 PC. <span style={{ fontWeight: 500 }}>새로운 시작.</span></p></Fade>
                            <Fade bottom opposite when={this.state.current===0} duration={800}><p className='carousel-item-text'>유로트럭 풀옵을 돌리기 위한 그의 부단한 노력.</p></Fade>
                        </div>
                    </Fade>
                    <Fade opposite when={this.state.current===1} duration={800}>
                        <div className='carousel-item' style={{ backgroundImage: `url(${require('images/carousel_2.jpg')})`}}>
                            <Fade bottom opposite when={this.state.current===1} duration={800}><p className='carousel-item-text carousel-item-text-title'>文, "경영대학원 <span style={{ fontWeight: 500 }}>사퇴</span> 결정"</p></Fade>
                            <Fade bottom opposite when={this.state.current===1} duration={800}><p className='carousel-item-text'>4개월 간의 숨가쁜 大장정···끝내 막을 내리다</p></Fade>
                        </div>
                    </Fade>
                    <Fade opposite when={this.state.current===2} duration={800}>
                        <div className='carousel-item' style={{ backgroundImage: `url(${require('images/carousel_3.jpg')})`}}>
                        </div>
                    </Fade>

                    <div className='carousel-arrows'>
                        <IconButton onClick={this.toPrev}><Icon style={{ fontSize: 30, color: 'white'}}>navigate_before</Icon></IconButton>
                        <IconButton onClick={this.toNext}><Icon style={{ fontSize: 30, color: 'white'}}>navigate_next</Icon></IconButton>
                    </div>

                    <div className='carousel-navigator'>
                        <div
                            onClick={this.state.current===0 ? null : () => this.toNth(0)}
                            className='carousel-navigator-button'
                            style={this.state.current===0 ? { opacity: .8 } : { cursor: 'pointer' }} />
                        <div
                            onClick={this.state.current===1 ? null : () => this.toNth(1)}
                            className='carousel-navigator-button'
                            style={this.state.current===1 ? { opacity: .8 } : { cursor: 'pointer' }} />
                        <div
                            onClick={this.state.current===2 ? null : () => this.toNth(2)}
                            className='carousel-navigator-button'
                            style={this.state.current===2 ? { opacity: .8 } : { cursor: 'pointer' }} />
                    </div>

                    <div className='carousel-progress-bar' style={{ width: `${this.state.progress > 100 ? 100 : this.state.progress}%` }} />
                </div>
            </Fade>
        )
    }
}
