import { createAction, handleActions } from 'redux-actions';

const initialState = {
    loggedIn: false
};

const CHECK_LOGIN = 'contents/CHECK_LOGIN';

export const checkLogin = createAction(CHECK_LOGIN);

export default handleActions({
    [CHECK_LOGIN]: (state, { payload }) => {
        return {
            loggedIn: true,
        };
    },
}, initialState);

