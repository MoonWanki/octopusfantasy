import { createAction, handleActions } from 'redux-actions'
import { getProfile } from 'utils/api'

const initialState = {
    isSignedIn: false,
    isPending: true,
    profile: null,
}

const FETCH_USER = 'user/FETCH_USER'
const FETCH_USER_PENDING = 'user/FETCH_USER_PENDING'
const FETCH_USER_FULFILLED = 'user/FETCH_USER_FULFILLED'
const FETCH_USER_REJECTED = 'user/FETCH_USER_REJECTED'

export const fetchUser = createAction(FETCH_USER, () => getProfile())

export default handleActions({
    [FETCH_USER_PENDING]: state => {
        return {
            ...state,
            isPending: true,
        }
    },
    [FETCH_USER_FULFILLED]: (state, { payload }) => {
        return {
            ...state,
            isPending: false,
            isSignedIn: payload.status===200,
            profile: payload.status===200 ? {
                id: String(payload.data.id),
                nickname: payload.data.nickname,
                email: payload.data.email || '',
                profileImage: payload.data.profileImage
            } : null
        }
    },
    [FETCH_USER_REJECTED]: (state, { payload }) => {
        return {
            ...state,
            isPending: false,
            isSignedIn: false,
            profile: null,
        }
    },
}, initialState)

