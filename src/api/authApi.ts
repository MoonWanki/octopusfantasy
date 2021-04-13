import axios from 'axios';

/* ---------- User Authentication ---------- */

export const requestSignIn = (provider: string, code: string, state: string) => axios({
    method: 'GET',
    baseURL: process.env.SERVER_URL,
    url: '/oauth/signin',
    params: {
        'provider': provider,
        'code': code,
        'state': state,
    },
    withCredentials: true,
});

export const requestProfile = () => axios({
    method: 'GET',
    baseURL: process.env.SERVER_URL,
    url: '/oauth/profile',
    withCredentials: true,
});

export const requestSignOut = () => axios({
    method: 'GET',
    baseURL: process.env.SERVER_URL,
    url: '/oauth/signout',
    withCredentials: true,
});
