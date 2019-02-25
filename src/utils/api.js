import axios from 'axios'

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