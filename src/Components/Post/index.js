import React, { Component } from 'react'
import './index.scss'

const getStringDate = rawDate => {
    const date = new Date(rawDate)
    const options = {
        hour12: false,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }
    return date.toLocaleTimeString("ko-KR", options)
}

export default class Post extends Component {
    
    render() {

        let typeColor
        switch(this.props.type) {
            case 'music': typeColor = '#473d80'; break
            case 'entertainment': typeColor = '#c16a70'; break
            case 'daigasso': typeColor = '#d69739'; break
            case 'gamevideo': typeColor = '#8f3f39'; break
            default: typeColor = 'black'; break
        }

        return (
            <div className='post'>
                <div className='post-colorbox' style={{ background: typeColor }} />
                <div className='post-title'>{this.props.title}</div>
                <div className='post-postedon'>{getStringDate(this.props.postedOn)}</div>

                {this.props.image &&
                    <div>
                        <img src={this.props.image} width="100%" height="auto" alt=""/>
                    </div>
                }
                {this.props.video &&
                    <div className='post-video-wrapper'>
                        <div className='post-video'>
                            <iframe
                                width="100%"
                                height="100%"
                                title={this.props.title}
                                src={this.props.video}
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}>
                            </iframe>
                        </div>
                    </div>
                }
            </div>
        )
    }
}