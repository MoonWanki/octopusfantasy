import React, { Component } from 'react'
import { IconButton, Icon, Button } from '@material-ui/core'
import './index.scss'

export default class Post extends Component {

    onLike = () => {

    }

    onCancelLike = () => {

    }

    onSaveComment = () => {

    }

    onEditComment = () => {

    }

    onDeleteComment = () => {

    }

    renderComments = () => {
        return this.props.comments.map(comment =>
            <div>
                {comment.text}
            </div>
        )
    }
    
    render() {

        return (
            <div className='post'>
                <div className={`post-colorbox${this.props.type && ` post-colorbox-${this.props.type}`}`} />
                <div className='post-title'>{this.props.title}</div>
                <div className='post-postedon'>{new Date(this.props.postedOn).toLocaleTimeString("ko-KR", { hour12: false, year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>

                {this.props.image &&
                    <div>
                        <img src={this.props.image} width="100%" height="auto" alt="" />
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

                <div className='post-menu'>
                    <div>
                        <Button variant="outlined">
                            <Icon style={{ fontSize: 16 }}>favorite</Icon>
                            &nbsp;&nbsp;{this.props.likes.length}
                        </Button>
                        &nbsp;&nbsp;
                        <IconButton onClick={null}>
                            <Icon>link</Icon>
                        </IconButton>
                    </div>
                    <div className='post-menu-cc' />
                </div>

                <p style={{ fontWeight: 500, fontSize: '1.2em' }}>댓글 {this.props.comments.length}개</p>
                {this.renderComments()}

            </div>
        )
    }
}