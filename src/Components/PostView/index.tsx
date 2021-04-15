import React, { useState, useCallback, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton, Icon, Button, TextField, Snackbar, Avatar, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Tooltip } from '@material-ui/core';
import { loadPostById, addComment,/* editComment,*/ deleteComment, addRecomment,/* editRecomment,*/ deleteRecomment, addLike, deleteLike } from '~/api/postApi';
import moment from 'moment';
import produce from 'immer';
import { RootState } from '~/store';
import { Post, Comment } from '~/types/post';
import './index.scss';

moment.locale('ko', require('moment/locale/ko'));

interface Props
{
    post: Post,
}

export default function PostView({ post }: Props)
{
    const profile = useSelector((state: RootState) => state.user.profile);

    const [ state, setState ] = useState({
        likes: post.likes,
        isLikePending: false,
        comments: post.comments.map((comment: Comment) => ({
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
        plzLoginDialogOpen: false,
        linkCopiedSnackbarOpen: false,
    });

    const onSaveComment = useCallback(() => {
        setState({ ...state, isCommentPending: true });
        addComment(post.id, state.commentText)
        .then(res => {
            setState({ ...state, commentText: '', isCommentPending: false });
            updateComments();
        })
        .catch(err => {
            console.error(err);
            setState({ ...state, isCommentPending: false });
        });
    }, []);

    const onEditComment = useCallback(() => {
        alert('준비 중입니다.');
    }, []);

    const onDeleteComment = useCallback((idx: number) => {
        deleteComment(post.id, state.comments[idx]._id)
        .then(res => {
            updateComments();
        })
        .catch(err => console.error(err));
    }, []);

    const onSaveRecomment = useCallback((idx: number) => {
        setState(produce(state, draft => { draft.comments[idx].isRecommentPending = true }));
        addRecomment(post.id, state.comments[idx]._id, state.comments[idx].recommentText)
        .then(res => {
            setState(produce(state, draft => {
                draft.commentText = '';
                draft.comments[idx].isRecommentPending = false;
            }));
            updateComments();
        })
        .catch(err => {
            console.error(err);
            setState(produce(state, draft => {
                draft.comments[idx].isRecommentPending = false;
            }));
        })
    }, []);

    const onEditRecomment = useCallback((cIdx: number, rcIdx: number) => {
        alert('준비 중입니다.');
    }, []);

    const onDeleteRecomment = useCallback((cIdx: number, rcIdx: number) => {
        deleteRecomment(post.id, state.comments[cIdx]._id, state.comments[cIdx].recomments[rcIdx]._id)
        .then(res => {
            updateComments();
        })
        .catch(err => console.error(err));
    }, []);

    const onSaveRerecomment = useCallback((cIdx: number, rcIdx: number) => {
        setState(produce(state, draft => {
            draft.comments[cIdx].recomments[rcIdx].isRecommentPending = true;
        }));
        addRecomment(post.id, state.comments[cIdx]._id, state.comments[cIdx].recomments[rcIdx].recommentText)
        .then(res => {
            setState(state => produce(state, draft => {
                draft.comments[cIdx].recomments[rcIdx].recommentText = ''
                draft.comments[cIdx].recomments[rcIdx].isRecommentPending = false
            }));
            updateComments();
        })
        .catch(err => {
            console.error(err)
            setState(state => produce(state, draft => {
                draft.comments[cIdx].recomments[rcIdx].isRecommentPending = false
            }))
        });
    }, []);

    const updateComments = () => {
        loadPostById(post.id)
        .then(res => setState({ ...state, comments: res.data.comments }))
        .catch(err => console.error(err));
    };

    const onRecommentTextChange = useCallback((idx: number, text: string) => {
        setState(produce(state, draft => {
            draft.comments[idx].recommentText = text;
        }));
    }, []);

    const onRerecommentTextChange = useCallback((cIdx: number, rcIdx: number, text: string) => {
        setState(produce(state, draft => {
            draft.comments[cIdx].recomments[rcIdx].recommentText = text;
        }));
    }, []);

    const onEditingCommentTextChange = useCallback((e, cIdx) => {
        setState(produce(state, draft => {
            draft.comments[cIdx].editingText = e.target.value;
        }));
    }, []);

    const onLikeButtonClick = useCallback(() => {
        if(profile && !state.isLikePending) {
            setState({ ...state, isLikePending: true });
            const idx = state.likes.findIndex(id => id === profile.id);
            if(idx === -1) {
                addLike(post.id)
                .then(() => setState(state => produce(state, draft => {
                    draft.likes.push(profile.id);
                    draft.isLikePending = false;
                })))
                .catch(err => setState({ ...state, isLikePending: false }));
            }
            else {
                deleteLike(post.id)
                .then(() => setState(state => produce(state, draft => {
                    draft.likes.splice(idx, 1);
                    draft.isLikePending = false;
                })))
                .catch(err => setState({ ...state, isLikePending: false }));
            }
        }
        else {
            setState({ ...state, plzLoginDialogOpen: true })
        }
    }, []);

    const onLinkButtonClick = useCallback(() => {
        let temp = document.createElement("textarea");
        document.body.appendChild(temp);
        temp.value = `${window.location.origin}/post/${post.id}`;
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        setState({ ...state, linkCopiedSnackbarOpen: true });
    }, []);

    const onRecommentButtonClick = useCallback((idx: number) => {
        setState(state => produce(state, draft => {
            draft.comments[idx].isRecommenting = !state.comments[idx].isRecommenting
        }))
    }, []);

    const onRerecommentButtonClick = useCallback((cIdx: number, rcIdx: number) => {
        setState(state => produce(state, draft => {
            draft.comments[cIdx].recomments[rcIdx].isRecommenting = !state.comments[cIdx].recomments[rcIdx].isRecommenting
        }))
    }, []);

    const renderComments = () => state.comments.map((comment: any, i: number) =>
        <div className='comment' key={i}>
            <Avatar alt={comment.commentedBy.nickname} src={comment.commentedBy.profileImage} />
            <div className='comment-body'>
                <div className='comment-header'>
                    <div style={{ fontWeight: 500, color: 'black', marginRight: '1em' }}>{comment.commentedBy.nickname}</div>
                    <div>{comment.valid && moment(comment.commentedOn).fromNow()}</div>
                    {comment.valid && comment.modified && ` · 수정됨`}
                    {comment.valid && profile && comment.commentedBy.id === profile.id && <Fragment>
                        &nbsp;·&nbsp;<div className='comment-header-button' onClick={onEditComment}>수정</div>
                        &nbsp;·&nbsp;<div className='comment-header-button' onClick={() => setState(produce(state, draft => { draft.comments[i].isDeleteDialogOpened = true }))}>삭제</div>
                    </Fragment>}
                </div>
                <div className='comment-text'>{comment.valid ? comment.text : <span style={{ color: 'lightgray' }}>삭제된 댓글입니다.</span>}</div>
                {comment.valid && <div><span className='comment-recomment-button' onClick={() => onRecommentButtonClick(i)}>답글 달기</span></div>}
                {comment.valid && comment.isRecommenting &&
                    <div>
                        <TextField
                            id="standard-multiline-flexible"
                            label={profile ? '답글을 입력하세요.' : '로그인 후 답글을 작성할 수 있습니다.'}
                            multiline
                            value={state.comments[i].recommentText}
                            onChange={e => onRecommentTextChange(i, e.target.value)}
                            margin="normal"
                            fullWidth
                            disabled={!profile} />
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button variant='outlined' disabled={!profile || comment.isRecommentPending || !comment.recommentText} onClick={() => onSaveRecomment(i)}>등록</Button>
                        </div>
                    </div>}
                {renderRecomments(comment.recomments, i)}
                {renderDeleteCommentDialog(i)}
            </div>
        </div>
    );

    const renderRecomments = (recomments: any, i: number) => recomments.map((recomment: any, j: number) =>
        <div className='comment' key={j}>
            <Avatar alt={recomment.recommentedBy.nickname} src={recomment.recommentedBy.profileImage} />
            <div className='comment-body'>
                <div className='comment-header'>
                    <div style={{ fontWeight: 500, color: 'black', marginRight: '1em' }}>{recomment.recommentedBy.nickname}</div>
                    <div>{recomment.valid && moment(recomment.recommentedOn).fromNow()}</div>
                    {recomment.valid && recomment.modified && ` · 수정됨`}
                    {recomment.valid && profile && recomment.recommentedBy.id === profile.id && <Fragment>
                        &nbsp;·&nbsp;<div className='comment-header-button' onClick={onEditComment}>수정</div>
                        &nbsp;·&nbsp;<div className='comment-header-button' onClick={() => setState(produce(state, draft => { draft.comments[i].recomments[j].isDeleteDialogOpened = true }))}>삭제</div>
                    </Fragment>}
                </div>
                <div className='comment-text'>{recomment.valid ? recomment.text : <span style={{ color: 'lightgray' }}>삭제된 답글입니다.</span>}</div>
                {recomment.valid && <div><span className='comment-recomment-button' onClick={() => onRerecommentButtonClick(i, j)}>답글 달기</span></div>}
                {recomment.valid && recomment.isRecommenting &&
                    <div>
                        <TextField
                            id="standard-multiline-flexible"
                            label={profile ? '답글을 입력하세요.' : '로그인 후 이용 가능합니다.'}
                            multiline
                            value={recomments.recommentText}
                            onChange={e => onRerecommentTextChange(i, j, e.target.value)}
                            margin="normal"
                            fullWidth
                            disabled={!profile} />
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button variant='outlined' disabled={!profile || recomment.isRecommentPending || !recomment.recommentText} onClick={() => onSaveRerecomment(i, j)}>등록</Button>
                        </div>
                    </div>}
            </div>
            {renderDeleteRecommentDialog(i, j)}
        </div>
    );

    const renderDeleteCommentDialog = (idx: number) => {
        return (
            <Dialog
                open={state.comments[idx].isDeleteDialogOpened || false}
                onClose={() => setState(state => produce(state, draft => { draft.comments[idx].isDeleteDialogOpened = false }))}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    <span style={{ fontFamily: 'Noto Sans KR', fontWeight: 500 }}>정말 댓글을 삭제하시겠습니까?</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span style={{ fontFamily: 'Noto Sans KR' }}>삭제한 댓글은 복구할 수 없습니다.</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setState(state => produce(state, draft => { draft.comments[idx].isDeleteDialogOpened = false }))}>
                        취소
                    </Button>
                    <Button color="primary" onClick={() => {
                        setState(state => produce(state, draft => { draft.comments[idx].isDeleteDialogOpened = false }))
                        onDeleteComment(idx)
                    }} autoFocus>
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const renderDeleteRecommentDialog = (cIdx: number, rcIdx: number) => {
        return (
            <Dialog
                open={state.comments[cIdx].recomments[rcIdx].isDeleteDialogOpened || false}
                onClose={() => setState(state => produce(state, draft => { draft.comments[cIdx].recomments[rcIdx].isDeleteDialogOpened = false }))}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    <span style={{ fontFamily: 'Noto Sans KR', fontWeight: 500 }}>정말 답글을 삭제하시겠습니까?</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span style={{ fontFamily: 'Noto Sans KR' }}>삭제한 답글은 복구할 수 없습니다.</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setState(state => produce(state, draft => { draft.comments[cIdx].recomments[rcIdx].isDeleteDialogOpened = false }))}>
                        취소
                    </Button>
                    <Button color="primary" onClick={() => {
                        setState(state => produce(state, draft => { draft.comments[cIdx].recomments[rcIdx].isDeleteDialogOpened = false }))
                        onDeleteRecomment(cIdx, rcIdx)
                    }} autoFocus>
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <div className='post'>
            <div className={`post-colorbox${post.type && ` post-colorbox-${post.type}`}`} />
            <div className='post-title'>{post.title}</div>
            <div className='post-postedon'>{new Date(post.postedOn).toLocaleTimeString("ko-KR", { hour12: false, year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>

            {post.image &&
                <div>
                    <img src={post.image} width="100%" height="auto" alt="" />
                </div>
            }

            {post.video &&
                <div className='post-video-wrapper'>
                    <div className='post-video'>
                        <iframe
                            width="100%"
                            height="100%"
                            title={post.title}
                            src={post.video}
                            frameBorder={0}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen={true}>
                        </iframe>
                    </div>
                </div>
            }

            <div className='post-menu'>
                <div>
                    <Button variant="outlined" onClick={onLikeButtonClick} disabled={state.isLikePending} color={profile && state.likes.includes(profile.id) ? 'primary' : undefined}>
                        <Icon style={{ fontSize: 16 }}>favorite</Icon>
                        &nbsp;&nbsp;{state.likes.length}
                    </Button>
                    &nbsp;&nbsp;
                    <Tooltip title="링크 복사">
                        <IconButton onClick={onLinkButtonClick}>
                            <Icon>link</Icon>
                        </IconButton>
                    </Tooltip>
                </div>
                <Tooltip title="저작자 명시 필수 · 영리적 사용 불가 · 내용 변경 불가">
                    <div className='post-menu-cc' />
                </Tooltip>
            </div>

            <p style={{ fontWeight: 500, fontSize: '1.2em' }}>
                댓글 {state.comments.reduce((acc, cur) => acc + Number(cur.valid) + cur.recomments.filter(rc => rc.valid).length, 0)}개
            </p>

            {renderComments()}

            <TextField
                id="standard-multiline-flexible"
                label={profile ? '댓글을 입력하세요.' : '로그인 후 댓글을 작성할 수 있습니다.'}
                multiline
                value={state.commentText}
                onChange={e => setState({ ...state, commentText: e.target.value })}
                margin="normal"
                fullWidth
                disabled={!profile}
            />
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button variant='outlined' disabled={!profile || state.isCommentPending || !state.commentText} onClick={onSaveComment}>등록</Button>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={state.linkCopiedSnackbarOpen}
                onClose={() => setState({ ...state, linkCopiedSnackbarOpen: false })}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                autoHideDuration={2000}
                message={<span id="message-id">링크가 복사되었습니다!</span>}
            />

            <Dialog
                open={state.plzLoginDialogOpen || false}
                onClose={() => setState({ ...state, plzLoginDialogOpen: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title"><span style={{ fontFamily: 'Noto Sans KR', fontWeight: 500 }}>아직 로그인을 안 하셨네요!</span></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span style={{ fontFamily: 'Noto Sans KR' }}>로그인 후 Octopus Fantasy의 다양한 컨텐츠를 만나보세요.</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to={`/login?url=${encodeURIComponent(window.location.pathname)}`}>
                        <Button color="primary">
                            로그인
                        </Button>
                    </Link>
                    <Button color="primary" onClick={() => setState({ ...state, plzLoginDialogOpen: false })} autoFocus>
                        나중에
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
