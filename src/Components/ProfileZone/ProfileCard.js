import React, { Component } from 'react'
import * as userActions from 'store/modules/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from 'utils/api'

class ProfileCard extends Component {

    handleLogout = () => {
        signOut()
        .then(res => {
            window.location.reload()
        }).catch(err => alert(err))
    }

    render() {
        return (
            <div>
                <h3>{`${this.props.profile.nickname}님 안녕하세요!`}</h3>
                <button onClick={this.handleLogout}>로그아웃</button>
            </div>
        )
    }
}

export default connect(null, dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
}))(ProfileCard)