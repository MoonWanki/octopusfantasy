import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IconButton, Icon, Button, TextField, Snackbar } from '@material-ui/core'
import './index.scss'

class Post extends Component {

    state = {
        newCommentText: '',
        editingCommentText: '',
    }

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

    onNewCommentTextChange = e => {
        this.setState({ newCommentText: e.target.value })
    }

    onEditingCommentTextChange = e => {
        this.setState({ editingCommentText: e.target.value })
    }

    onLinkCopyButtonClick = () => {
        let temp = document.createElement("textarea")
        document.body.appendChild(temp)
        temp.value = `https://www.octopusfantasy.com/post/${this.props.id}`
        temp.select()
        document.execCommand('copy')
        document.body.removeChild(temp)
        this.setState({ linkCopiedSnackbarOpen: true })
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
                        <Button variant="outlined" disabled={!this.props.profile}>
                            <Icon style={{ fontSize: 16 }}>favorite</Icon>
                            &nbsp;&nbsp;{this.props.likes.length}
                        </Button>
                        &nbsp;&nbsp;
                        <IconButton onClick={this.onLinkCopyButtonClick}>
                            <Icon>link</Icon>
                        </IconButton>
                    </div>
                    <div className='post-menu-cc' />
                </div>

                <p style={{ fontWeight: 500, fontSize: '1.2em' }}>댓글 {this.props.comments.length}개</p>
                {this.renderComments()}

                <TextField
                    id="standard-multiline-flexible"
                    label={this.props.profile ? '댓글을 입력하세요.' : '로그인 후 이용 가능합니다.'}
                    multiline
                    value={this.state.newCommentText}
                    onChange={this.onNewCommentTextChange}
                    margin="normal"
                    fullWidth
                    disabled={!this.props.profile}
                />
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button variant='outlined' disabled={!this.props.profile}>등록</Button>
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.state.linkCopiedSnackbarOpen}
                    onClose={() => this.setState({ linkCopiedSnackbarOpen: false })}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={2000}
                    message={<span id="message-id">링크가 복사되었습니다!</span>}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        profile: state.user.profile,
}))(Post)