import axios from 'axios'

/* ---------- User Authentication ---------- */

export const signIn = (provider, code, state) => axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: '/oauth/signin',
    params: {
        'provider': provider,
        'code': code,
        'state': state,
    },
    withCredentials: true,
})

export const getProfile = () => axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: '/oauth/profile',
    withCredentials: true,
})

export const signOut = () => axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: '/oauth/signout',
    withCredentials: true,
})

/* ---------- POST ---------- */

export const loadAllPosts = () => axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: '/post',
})

export const loadPostsByType = type => axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post?type=${type}`,
})

export const loadPostById = pid => axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}`,
})

/* ---------- LIKE ---------- */

export const addLike = pid => axios({
    method: 'POST',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}/like`,
    withCredentials: true,
})

export const deleteLike = pid => axios({
    method: 'DELETE',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}/like`,
    withCredentials: true,
})

/* ---------- COMMENT ---------- */

export const addComment = (pid, text) => axios({
    method: 'POST',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}/comment`,
    data: { text },
    withCredentials: true,
})

export const editComment = (pid, cid, text) => axios({
    method: 'PUT',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}/comment/${cid}`,
    data: { text },
    withCredentials: true,
})

export const deleteComment = (pid, cid) => axios({
    method: 'DELETE',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}/comment/${cid}`,
    withCredentials: true,
})

export const addRecomment = (pid, cid, text) => axios({
    method: 'POST',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}/comment/${cid}`,
    data: { text },
    withCredentials: true,
})

export const editRecomment = (pid, cid, rcid, text) => axios({
    method: 'PUT',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}/comment/${cid}/${rcid}`,
    data: { text },
    withCredentials: true,
})

export const deleteRecomment = (pid, cid, rcid) => axios({
    method: 'DELETE',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: `/post/${pid}/comment/${cid}/${rcid}`,
    withCredentials: true,
})