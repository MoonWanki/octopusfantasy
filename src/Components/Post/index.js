import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { IconButton, Icon, Button, TextField, Snackbar, Avatar, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import { loadPostById, addComment,/* editComment,*/ deleteComment, addRecomment,/* editRecomment,*/ deleteRecomment, addLike, deleteLike } from 'utils/api'
import moment from 'moment'
import produce from 'immer'
import './index.scss'
class Post extends Component {

    state = {
        comments: this.props.comments.map(comment => ({
            ...comment,
            isEditing: false,
            editingText: comment.text,
            isEditionPending: false,
            recomments: comment.recomments.map(recomment => ({
                ...recomment,
                editingText: '',
                isEditing: false,
                isEditionPending: false,
                recommentText: '',
                isRecommenting: false,
                isRecommentPending: false,
                isDeleteDialogOpened: false,
            })),
            isRecommenting: false,
            recommentText: '',
            isRecommentPending: false,
            isDeleteDialogOpened: false,
        })),
        commentText: '',
        isCommentPending: false,
    }
    
    onLike = () => {
        addLike(this.props.id)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }

    onCancelLike = () => {
        deleteLike(this.props.id)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }

    onSaveComment = () => {
        this.setState({ isCommentPending: true },  () => {
            addComment(this.props.id, this.state.commentText)
            .then(res => {
                this.setState({ commentText: '', isCommentPending: false })
                this.updateComments()
            })
            .catch(err => {
                console.error(err)
                this.setState({ isCommentPending: false })
            })
        })
    }

    onEditComment = idx => {
        alert('준비 중입니다.')
    }

    onDeleteComment = idx => {
        deleteComment(this.props.id, this.state.comments[idx]._id)
        .then(res => this.updateComments())
        .catch(err => console.error(err))
    }

    onSaveRecomment = idx => {
        this.setState(state => produce(state, draft => { draft.comments[idx].isRecommentPending = true }), () => {
            addRecomment(this.props.id, this.state.comments[idx]._id, this.state.comments[idx].recommentText)
            .then(res => {
                this.setState(state => produce(state, draft => {
                    draft.comments[idx].commentText = ''
                    draft.comments[idx].isRecommentPending = false
                }))
                this.updateComments()
            })
            .catch(err => {
                console.error(err)
                this.setState(state => produce(state, draft => {
                    draft.comments[idx].isRecommentPending = false
                }))
            })
        })
    }

    onEditRecomment = (cIdx, rcIdx) => {
        alert('준비 중입니다.')
    }

    onDeleteRecomment = (cIdx, rcIdx) => {
        deleteRecomment(this.props.id, this.state.comments[cIdx]._id, this.state.comments[cIdx].recomments[rcIdx]._id)
        .then(res => this.updateComments())
        .catch(err => console.error(err))
    }

    onSaveRerecomment = (cIdx, rcIdx) => {
        this.setState(state => produce(state, draft => { draft.comments[cIdx].recomments[rcIdx].isRecommentPending = true }), () => {
            addRecomment(this.props.id, this.state.comments[cIdx]._id, this.state.comments[cIdx].recomments[rcIdx].recommentText)
            .then(res => {
                this.setState(state => produce(state, draft => {
                    draft.comments[cIdx].recomments[rcIdx].recommentText = ''
                    draft.comments[cIdx].recomments[rcIdx].isRecommentPending = false
                }))
                this.updateComments()
            })
            .catch(err => {
                console.error(err)
                this.setState(state => produce(state, draft => {
                    draft.comments[cIdx].recomments[rcIdx].isRecommentPending = false
                }))
            })
        })
    }

    updateComments = () => {
        loadPostById(this.props.id)
        .then(res => this.setState({ comments: res.data.comments }))
        .catch(err => console.error(err))
    }

    onRecommentTextChange = (idx, text) => {
        this.setState(state => produce(state, draft => {
            draft.comments[idx].recommentText = text
        }))
    }

    onRerecommentTextChange = (cIdx, rcIdx, text) => {
        this.setState(state => produce(state, draft => {
            draft.comments[cIdx].recomments[rcIdx].recommentText = text
        }))
    }

    onEditingCommentTextChange = e => this.setState({ editingCommentText: e.target.value })

    onLinkButtonClick = () => {
        let temp = document.createElement("textarea")
        document.body.appendChild(temp)
        temp.value = `${window.location.origin}/post/${this.props.id}`
        temp.select()
        document.execCommand('copy')
        document.body.removeChild(temp)
        this.setState({ linkCopiedSnackbarOpen: true })
    }

    onRecommentButtonClick = idx => {
        this.setState(state => produce(state, draft => {
            draft.comments[idx].isRecommenting = !state.comments[idx].isRecommenting
        }))
    }

    onRerecommentButtonClick = (cIdx, rcIdx) => {
        this.setState(state => produce(state, draft => {
            draft.comments[cIdx].recomments[rcIdx].isRecommenting = !state.comments[cIdx].recomments[rcIdx].isRecommenting
        }))
    }
    
    render() {
        moment.locale('ko', require('moment/locale/ko'))

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
                        <IconButton onClick={this.onLinkButtonClick}>
                            <Icon>link</Icon>
                        </IconButton>
                    </div>
                    <div className='post-menu-cc' />
                </div>

                <p style={{ fontWeight: 500, fontSize: '1.2em' }}>댓글 {this.state.comments.length}개</p>
                {this.renderComments()}

                <TextField
                    id="standard-multiline-flexible"
                    label={this.props.profile ? '댓글을 입력하세요.' : '로그인 후 이용 가능합니다.'}
                    multiline
                    value={this.state.commentText}
                    onChange={e => this.setState({ commentText: e.target.value })}
                    margin="normal"
                    fullWidth
                    disabled={!this.props.profile}
                />
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button variant='outlined' disabled={!this.props.profile || this.state.isCommentPending || !this.state.commentText} onClick={this.onSaveComment}>등록</Button>
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
    
    renderComments = () => this.state.comments.map((comment, i) =>
        <div className='comment' key={i}>
            <Avatar alt={comment.commentedBy.nickname} src={comment.commentedBy.profileImage} />
            <div className='comment-body'>
                <div className='comment-header'>
                    <div style={{ fontWeight: 500, color: 'black', marginRight: '1em' }}>{comment.commentedBy.nickname}</div>
                    <div>{comment.valid && moment(comment.commentedOn).fromNow()}</div>
                    {comment.valid && comment.modified && ` · 수정됨`}
                    {comment.valid && this.props.profile && comment.commentedBy.id === this.props.profile.id.toString() && <Fragment>
                        &nbsp;·&nbsp;<div className='comment-header-button' onClick={this.onEditComment}>수정</div>
                        &nbsp;·&nbsp;<div className='comment-header-button' onClick={() => this.setState(produce(this.state, draft => { draft.comments[i].isDeleteDialogOpened = true }))}>삭제</div>
                    </Fragment>}
                </div>
                <div className='comment-text'>{comment.valid ? comment.text : <span style={{ color: 'lightgray' }}>삭제된 댓글입니다.</span>}</div>
                {comment.valid && <div><span className='comment-recomment-button' onClick={() => this.onRecommentButtonClick(i)}>답글 달기</span></div>}
                {comment.valid && comment.isRecommenting &&
                    <div>
                        <TextField
                            id="standard-multiline-flexible"
                            label={this.props.profile ? '답글을 입력하세요.' : '로그인 후 이용 가능합니다.'}
                            multiline
                            value={this.state.comments[i].recommentText}
                            onChange={e => this.onRecommentTextChange(i, e.target.value)}
                            margin="normal"
                            fullWidth
                            disabled={!this.props.profile} />
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button variant='outlined' disabled={!this.props.profile || comment.isRecommentPending || !comment.recommentText} onClick={() => this.onSaveRecomment(i)}>등록</Button>
                        </div>
                    </div>}
                {this.renderRecomments(comment.recomments, i)}
                {this.renderDeleteCommentDialog(i)}
            </div>
        </div>
    )
    

    renderRecomments = (recomments, i) => recomments.map((recomment, j) =>
        <div className='comment' key={j}>
            <Avatar alt={recomment.recommentedBy.nickname} src={recomment.recommentedBy.profileImage} />
            <div className='comment-body'>
                <div className='comment-header'>
                    <div style={{ fontWeight: 500, color: 'black', marginRight: '1em' }}>{recomment.recommentedBy.nickname}</div>
                    <div>{recomment.valid && moment(recomment.recommentedOn).fromNow()}</div>
                    {recomment.valid && recomment.modified && ` · 수정됨`}
                    {recomment.valid && this.props.profile && recomment.recommentedBy.id === this.props.profile.id.toString() && <Fragment>
                        &nbsp;·&nbsp;<div className='comment-header-button' onClick={this.onEditComment}>수정</div>
                        &nbsp;·&nbsp;<div className='comment-header-button' onClick={() => this.setState(produce(this.state, draft => { draft.comments[i].recomments[j].isDeleteDialogOpened = true }))}>삭제</div>
                    </Fragment>}
                </div>
                <div className='comment-text'>{recomment.valid ? recomment.text : <span style={{ color: 'lightgray' }}>삭제된 답글입니다.</span>}</div>
                {recomment.valid && <div><span className='comment-recomment-button' onClick={() => this.onRerecommentButtonClick(i, j)}>답글 달기</span></div>}
                {recomment.valid && recomment.isRecommenting &&
                    <div>
                        <TextField
                            id="standard-multiline-flexible"
                            label={this.props.profile ? '답글을 입력하세요.' : '로그인 후 이용 가능합니다.'}
                            multiline
                            value={recomments.recommentText}
                            onChange={e => this.onRerecommentTextChange(i, j, e.target.value)}
                            margin="normal"
                            fullWidth
                            disabled={!this.props.profile} />
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button variant='outlined' disabled={!this.props.profile || recomment.isRecommentPending || !recomment.recommentText} onClick={() => this.onSaveRerecomment(i, j)}>등록</Button>
                        </div>
                    </div>}
            </div>
            {this.renderDeleteRecommentDialog(i, j)}
        </div>
    )

    renderDeleteCommentDialog = idx => <Dialog
        open={this.state.comments[idx].isDeleteDialogOpened || false}
        onClose={() => this.setState(state => produce(state, draft => { draft.comments[idx].isDeleteDialogOpened = false }))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"정말 삭제하시겠습니까?"}</DialogTitle>
        <DialogActions>
            <Button onClick={() => this.setState(state => produce(state, draft => { draft.comments[idx].isDeleteDialogOpened = false }))}>
                아니오
            </Button>
            <Button onClick={() => {
                this.setState(state => produce(state, draft => { draft.comments[idx].isDeleteDialogOpened = false }))
                this.onDeleteComment(idx)
            }} autoFocus>
                예
            </Button>
        </DialogActions>
        </Dialog>

    renderDeleteRecommentDialog = (cIdx, rcIdx) => <Dialog
        open={this.state.comments[cIdx].recomments[rcIdx].isDeleteDialogOpened || false}
        onClose={() => this.setState(state => produce(state, draft => { draft.comments[cIdx].recomments[rcIdx].isDeleteDialogOpened = false }))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"정말 삭제하시겠습니까?"}</DialogTitle>
        <DialogActions>
            <Button onClick={() => this.setState(state => produce(state, draft => { draft.comments[cIdx].recomments[rcIdx].isDeleteDialogOpened = false }))}>
                아니오
            </Button>
            <Button onClick={() => {
                this.setState(state => produce(state, draft => { draft.comments[cIdx].recomments[rcIdx].isDeleteDialogOpened = false }))
                this.onDeleteRecomment(cIdx, rcIdx)
            }} autoFocus>
                예
            </Button>
        </DialogActions>
        </Dialog>
}

export default connect(
    state => ({
        profile: state.user.profile,
}))(Post)