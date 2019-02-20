import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'qs'
import './Login.scss'

class Login extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        const previousUrl = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).url || '/'
        const REDIRECT_URI = `${window.location.origin}/callback`
        if(this.props.isSignedIn) window.location.replace(previousUrl)

        if(this.props.isPending) return <div />
        else if(this.props.isSignedIn) return <div />
        else return (
            <div className='login-page-wrapper'>
                <div className='login-page-inner'>
                    <Link to='/'>
                        <div className='login-page-home-button'/>
                    </Link>
                    <div className='login-button-container'>
                        <a href={`https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_API_KEY}&redirect_uri=${REDIRECT_URI}&state=${encodeURIComponent(btoa(`provider=NAVER&url=${previousUrl}`))}&response_type=code`}>
                            <div className='login-button login-button-naver'/>
                        </a>
                        <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&state=${encodeURIComponent(btoa(`provider=KAKAO&url=${previousUrl}`))}&response_type=code`}>
                            <div className='login-button login-button-kakao'/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        isPending: state.user.isPending,
        isSignedIn: state.user.isSignedIn,
}))(Login)