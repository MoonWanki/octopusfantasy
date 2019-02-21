import React, { Component } from 'react'
import { signIn } from 'utils/api'
import qs from 'qs'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class LoginCallback extends Component {

    componentDidMount() {
        const { code, state } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        if (!code && !state) {
            alert('잘못된 접근입니다!')
            window.location.replace('/')
        } else {
            const { provider, url } = qs.parse(atob(state))
            if (!provider && !url) {
                alert('잘못된 접근입니다!')
                window.location.replace('/')
            } else {
                signIn(provider, code, state)
                .then(res => {
                    window.location.replace(url)
                }).catch(err => {
                    alert(`로그인에 실패하였습니다.`)
                    console.log(err)
                    window.location.replace(url)
                })
            }
        }
    }

    render() {
        return (
            <div style={{ width: '100vw', height: '100vh', display: 'table' }}>
                <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }}>
                    <CircularProgress />
                    <p style={{ color: 'gray', marginTop: '24px' }}>로그인 중입니다. 잠시만 기다려주세요</p>
                </div>
            </div>
        )
    }
}
