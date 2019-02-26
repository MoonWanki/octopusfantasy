import React, { Component } from 'react'
import Post from 'Components/Post'
import { Header, Footer } from 'Components'
import { loadPostsByType, loadPostById } from 'utils/api'
import { CircularProgress } from '@material-ui/core'
import './PostScroller.scss'

const banners = {

    music:
        <div className='post-scroller-banner' style={{ backgroundImage: `url(${require('images/banner_music.jpg')})` }}>
            <div className='post-scroller-banner-inner'>
                <div className='post-scroller-banner-title'>Music Works</div>
                <div className='post-scroller-banner-text'>자작곡 및 뮤직비디오</div>
            </div>
        </div>,

    entertainment:
        <div className='post-scroller-banner' style={{ backgroundImage: `url(${require('images/banner_entertainment.jpg')})` }}>
            <div className='post-scroller-banner-inner'>
                <div className='post-scroller-banner-title'>Entertainments</div>
                <div className='post-scroller-banner-text'>흑역사가 넘쳐나는 UCC 영상들</div>
            </div>
        </div>,

    daigasso:
        <div className='post-scroller-banner' style={{ backgroundImage: `url(${require('images/banner_daigasso.jpg')})` }}>
            <div className='post-scroller-banner-inner'>
                <div className='post-scroller-banner-title'>Daigasso! DX</div>
                <div className='post-scroller-banner-text'>대합주! 밴드 브라더스 DX 작품 모음</div>
            </div>
        </div>,

    gamevideo:
        <div className='post-scroller-banner' style={{ backgroundImage: `url(${require('images/banner_gamevideo.jpg')})` }}>
            <div className='post-scroller-banner-inner'>
                <div className='post-scroller-banner-title'>Game Videos</div>
                <div className='post-scroller-banner-text'>각종 게임 플레이 영상 모음</div>
            </div>
        </div>,

    default:
        <div className='post-scroller-banner' style={{ backgroundImage: `url(${require('images/banner_default.jpg')})` }} />,
}

class PostScroller extends Component {

    state = {
        isFetchPending: false,
        isFetchFulfilled: false,
        isFetchRejected: false,
        posts: null,
        isMultiple: Boolean(this.props.type),
        sort: -1, // -1: recent order | 1: old order
        revealed: 1,
    }

    componentDidMount() {
        this.scrollToTop()
        window.addEventListener('scroll', this.onScroll)
        if(this.state.isMultiple) this.fetchPostsByType(this.props.type)
        else this.fetchPostById(this.props.match.params.pid)
    }

    shouldComponentUpdate(nextProps) {
        if(this.props.type !== nextProps.type) {
            this.scrollToTop()
            this.fetchPostsByType(nextProps.type)
        }
        return true
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }

    scrollToTop = () => window.scrollTo(0, 0)

    onScroll = () => {
        if(this.state.isFetchFulfilled && this.state.revealed < this.state.posts.length && document.body.scrollHeight - window.innerHeight - window.scrollY < 200) {
            this.setState({ revealed: this.state.revealed + 1 })
        }
    }

    // fetch categoried posts
    fetchPostsByType = type => {
        this.setState({ isFetchPending: true, isFetchFulfilled: false, isFetchRejected: false, revealed: 1 })
        loadPostsByType(type)
        .then(res => this.setState({ posts: res.data, isFetchPending: false, isFetchFulfilled: true }, this.onScroll))
        .catch(() => this.setState({ posts: null, isFetchPending: false, isFetchRejected: true }))
    }

    // fetch single post
    fetchPostById = pid => {
        this.setState({ isFetchPending: true, isFetchFulfilled: false, isFetchRejected: false })
        loadPostById(pid)
        .then(res => this.setState({ posts: [res.data], isFetchPending: false, isFetchFulfilled: true }))
        .catch(() => this.setState({ posts: null, isFetchPending: false, isFetchRejected: true }))
    }

    sortByRecent = () => this.setState({ sort: -1 })

    sortByOld = () => this.setState({ sort: 1 })

    renderPosts = () => {
        let sortedPosts = this.state.posts
        sortedPosts.sort((a,b) => a['posted-on'] > b['posted-on'] ? this.state.sort : -this.state.sort)
        return sortedPosts.slice(0, this.state.revealed).map((post, i) =>
            <Post
                key={i}
                id={post.id}
                type={post.type}
                title={post.title}
                postedOn={post['posted-on']}
                likes={post.likes}
                comments={post.comments}
                image={post.image}
                video={post.video} />
        )
    }

    render() {
        return (
            <div>
                <Header />
                {banners[this.props.type ? this.props.type : 'default']}

                {this.state.isFetchPending ?
                    <div style={{ height: '100vh' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 120 }}>
                            <CircularProgress />
                            <p style={{ color: 'gray', marginTop: '24px' }}>콘텐츠를 불러오고 있습니다...</p>
                        </div>
                    </div>
                : this.state.isFetchRejected ?
                    <p style={{ color: 'gray', margin: '200px 0', textAlign: 'center' }}>콘텐츠를 불러오지 못했습니다. 잠시 후에 다시 시도해보세요.</p>
                : this.state.isFetchFulfilled ? this.renderPosts() : null}

                {this.state.isMultiple && <div />}

                {(this.state.isFetchRejected || (this.state.isFetchFulfilled && this.state.revealed === this.state.posts.length)) && <Footer />}
            </div>
        )
    }
}

export default PostScroller