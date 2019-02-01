import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'qs'
import './Login.scss'

const NAVER_API_KEY = 'YFMdkIg07Fg5ZcA7asjT'
const KAKAO_API_KEY = '2b9f9544c6ae45b26358d6a5586297f1'
const REDIRECT_URI = 'http://localhost:3000/callback'

class Login extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        const previousUrl = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).url || '/'
        if(this.props.isPending) return <div />
        else if(this.props.isSignedIn) return <Redirect to='/' />
        else return (
            <div className='login-page-wrapper'>
                <div className='login-page-inner'>
                    <Link to='/'>
                        <div className='home-button'/>
                    </Link>
                    <div className='login-button-container'>
                        <a href={`https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_API_KEY}&redirect_uri=${REDIRECT_URI}&state=${encodeURIComponent(btoa(`provider=NAVER&url=${previousUrl}`))}&response_type=code`}>
                            <div className='naver-login-button'/>
                        </a>
                        <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&state=${encodeURIComponent(btoa(`provider=KAKAO&url=${previousUrl}`))}&response_type=code`}>
                            <div className='kakao-login-button'/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        isPending: state.user.isPending,
        isSignedIn: state.user.isSignedIn,
}))(Login)