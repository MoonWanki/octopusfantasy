import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostListContainer extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <div className='post-list-container'>
            
            </div>
        );
    }
}

export default connect(state => ({
    fetched: state.post.fetched,
    postList: state.post.postList
}))(PostListContainer);