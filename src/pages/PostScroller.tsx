import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Header, Footer, PostView } from '~/components';
import { loadPostsByType, loadPostById } from '~/api/postApi';
import { CircularProgress } from '@material-ui/core';
import { Post } from '~/types/post';
import bannerImageDefault from '~/assets/images/post_banner_default.jpg';
import bannerImageMusic from '~/assets/images/post_banner_music.jpg';
import bannerImageEntertainment from '~/assets/images/post_banner_entertainment.jpg';
import bannerImageDaigasso from '~/assets/images/post_banner_daigasso.jpg';
import bannerImageGamevideo from '~/assets/images/post_banner_gamevideo.jpg';
import './PostScroller.scss';

type PostType = 'music'|'entertainment'|'daigasso'|'gamevideo';

function renderBanner(postType: PostType): ReactElement
{
    let title = '';
    let description = '';
    let bannerImage = bannerImageDefault;
    if(postType == 'music')
    {
        title = 'Music Works';
        description = '자작곡 및 뮤직비디오';
        bannerImage = bannerImageMusic;
    }
    else if(postType == 'entertainment')
    {
        title = 'Entertainments';
        description = '흑역사가 넘쳐나는 UCC 영상들';
        bannerImage = bannerImageEntertainment;
    }
    else if(postType == 'daigasso')
    {
        title = 'Daigasso! DX';
        description = '대합주! 밴드 브라더스 DX 작품 모음';
        bannerImage = bannerImageDaigasso;
    }
    else if(postType == 'gamevideo')
    {
        title = 'Game Videos';
        description = '각종 게임 플레이 영상 모음';
        bannerImage = bannerImageGamevideo;
    }
    return (
        <div className='post-scroller-banner' style={{ backgroundImage: `url(${bannerImage})` }}>
            <div className='post-scroller-banner-inner'>
                <div className='post-scroller-banner-title'>{title}</div>
                <div className='post-scroller-banner-description'>{description}</div>
            </div>
        </div>
    );
}

function renderPosts(posts: Array<Post>, revealed: number)
{
    posts.sort((a: Post, b: Post) => a.postedOn < b.postedOn ? 1 : -1)
    return posts.slice(0, revealed).map((post, i) =>
        <PostView
            key={i}
            post={post} />
    );
}

interface Props extends RouteComponentProps
{
    type: PostType,
}

export default function PostScroller(props: Props)
{
    const [ isFetchPending, setFetchPending ] = useState<boolean>(false);
    const [ isFetchFulfilled, setFetchFulfilled ] = useState<boolean>(false);
    const [ isFetchRejected, setFetchRejected ] = useState<boolean>(false);
    const [ posts, setPosts ] = useState<Array<Post>>([]);
    const [ revealed, setRevealed ] = useState<number>(1);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [isFetchFulfilled, revealed]);

    useEffect(() => {
        () => window.scrollTo(0, 0);
        if(props.type)
        {
            fetchPostsByType(props.type);
        }
        else
        {
            const params: any = props.match.params;
            if(params.pid)
            {
                fetchPostById(params.pid);
            }
        }
    }, [props.type]);

    const onScroll = useCallback(() => {
        if(isFetchFulfilled && revealed < posts.length && document.body.scrollHeight - window.innerHeight - window.scrollY < 200) {
            setRevealed(revealed + 1);
        }
    }, [isFetchFulfilled, revealed]);

    // fetch categoried posts
    const fetchPostsByType = (type: string) => {
        setFetchPending(true);
        setFetchFulfilled(false);
        setFetchRejected(false);
        setRevealed(1);
        loadPostsByType(type)
        .then(res => {
            const posts: Array<Post> = res.data.map((rawPost: any) => ({
                id: Number(rawPost.id),
                type: rawPost.type,
                title: rawPost.title,
                postedOn: rawPost['posted-on'],
                likes: rawPost.likes,
                comments: rawPost.comments,
                image: rawPost.image,
                video: rawPost.video,
            }));
            setPosts(posts);
            setFetchPending(false);
            setFetchFulfilled(true);
        })
        .catch((err) => {
            console.error(err);
            setPosts([]);
            setFetchPending(false);
            setFetchRejected(true);
        });
    }

    // fetch single post
    const fetchPostById = (pid: number) => {
        setFetchPending(true);
        setFetchFulfilled(false);
        setFetchRejected(false);
        loadPostById(pid)
        .then(res => {
            const posts: Array<Post> = res.data.map((rawPost: any) => ({
                id: Number(rawPost.id),
                type: rawPost.type,
                title: rawPost.title,
                postedOn: rawPost['posted-on'],
                likes: rawPost.likes,
                comments: rawPost.comments,
                image: rawPost.image,
                video: rawPost.video,
            }));
            setPosts(posts);
            setFetchPending(false);
            setFetchFulfilled(true);
        })
        .catch((err) => {
            console.error(err);
            setPosts([]);
            setFetchPending(false);
            setFetchRejected(true);
        });
    }

    return (
        <div>
            <Header />
            {renderBanner(props.type)}
            {isFetchPending ?
                <div style={{ height: '100vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 120 }}>
                        <CircularProgress />
                        <p style={{ color: 'gray', marginTop: '24px' }}>콘텐츠를 불러오고 있습니다...</p>
                    </div>
                </div>
            : isFetchRejected ?
                <p style={{ color: 'gray', margin: '200px 0', textAlign: 'center' }}>콘텐츠를 불러오지 못했습니다. 잠시 후에 다시 시도해보세요.</p>
            : isFetchFulfilled ? renderPosts(posts, revealed) : null}

            {(isFetchRejected || (isFetchFulfilled && revealed === posts.length)) && <Footer />}
        </div>
    );
}
