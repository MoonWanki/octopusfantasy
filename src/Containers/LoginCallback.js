import React, { Component } from 'react'
import { signIn } from 'utils/api'
import qs from 'qs'

export default class LoginCallback extends Component {

    componentDidMount = async () => {
        const { code, state } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        if (!code && !state) {
            alert('잘못된 접근입니다.')
            window.location.replace('/')
        } else {
            const { provider, url } = qs.parse(atob(state))
            try {
                const res = await signIn(provider, code, state)
                if(res.status === 200) {
                    window.location.replace(url)
                } else {
                    alert(`로그인에 실패하였습니다.`)
                    window.location.replace(url)
                }
            } catch (err) {
                alert(`로그인에 실패하였습니다. (${err})`)
                window.location.replace(url)
            }
        }
    }

    render() {
        return (
            <div>
                로그인 중입니다. 잠시만 기다려주세요.
            </div>
        )
    }
}
