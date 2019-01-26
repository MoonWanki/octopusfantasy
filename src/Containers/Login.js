import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'

const NAVER_API_KEY = 'YFMdkIg07Fg5ZcA7asjT'
const KAKAO_API_KEY = '2b9f9544c6ae45b26358d6a5586297f1'

const NAVER_REDIRECT_URI = encodeURIComponent('http://localhost:4000/oauth/naver')
const KAKAO_REDIRECT_URI = encodeURIComponent('http://localhost:4000/oauth/kakao')

class Login extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <div className='login-page-wrapper'>
                <div className='login-page-inner'>
                    <Link to='/'>
                        <div className='home-button'/>
                    </Link>
                    <div className='login-button-container'>
                        <a href={`https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_API_KEY}&redirect_uri=${NAVER_REDIRECT_URI}&state=${encodeURIComponent('http://localhost:3000')}&response_type=code`}>
                            <div className='naver-login-button'/>
                        </a>
                        <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&state=${encodeURIComponent('http://localhost:3000')}&response_type=code`}>
                            <div className='kakao-login-button'/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login