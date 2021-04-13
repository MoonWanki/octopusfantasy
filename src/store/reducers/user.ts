import produce from 'immer';
import { createAsyncAction, createReducer } from 'typesafe-actions';
import { requestProfile } from '~/api/authApi';

export interface UserProfile
{
    id: string,
    nickname: string,
    email: string,
    profileImage: string,
}

interface UserState
{
    fetchStatus: {
        isPending: boolean,
        isSuccess: boolean,
        isFailed: boolean,
    },
    profile: UserProfile|undefined,
}

const initialState: UserState = {
    fetchStatus: {
        isPending: false,
        isSuccess: false,
        isFailed: false,
    },
    profile: undefined,
};

const FETCH_USER_PENDING = 'user/FETCH_USER_PENDING';
const FETCH_USER_SUCCESS = 'user/FETCH_USER_SUCCESS';
const FETCH_USER_FAILED = 'user/FETCH_USER_FAILED';

const fetchUserAsync = createAsyncAction(
    FETCH_USER_PENDING,
    [FETCH_USER_SUCCESS, (profile: UserProfile) => ({ profile })],
    [FETCH_USER_FAILED, (err: any) => ({ err })],
)();

export function fetchUser()
{
    return async (dispatch: any) => {
        dispatch(fetchUserAsync.request());
        try
        {
            const res = await requestProfile()
            if(res.status != 200)
            {
                throw(res.status.toString());
            }
            const profile: UserProfile = {
                id: res.data.id,
                nickname: res.data.nickname,
                email: res.data.email,
                profileImage: res.data.profileImage,
            };
            if(!profile.id)
            {
                throw("Profile format error: Abnormal user ID");
            }
            dispatch(fetchUserAsync.success(profile));
        }
        catch(err)
        {
            console.error(err);
            dispatch(fetchUserAsync.failure(err));
        }
    }
}

export default createReducer(initialState, {
    [FETCH_USER_PENDING]: (state, action) => {
        return produce(state, draft => {
            draft.fetchStatus.isPending = true;
            draft.fetchStatus.isFailed = false;
        });
    },
    [FETCH_USER_SUCCESS]: (state, action) => {
        const { profile } = action.payload;
        return produce(state, draft => {
            draft.fetchStatus.isPending = false;
            draft.fetchStatus.isSuccess = true;
            draft.profile = profile;
        });
    },
    [FETCH_USER_FAILED]: (state, action) => {
        const { err } = action.payload;
        return produce(state, draft => {
            draft.fetchStatus.isPending = false;
            draft.fetchStatus.isFailed = true;
        });
    },
});
