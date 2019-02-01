import axios from 'axios'

const SERVER_URL = 'http://localhost:4000'

export const signIn = (provider, code, state) => axios({
    method: 'GET',
    url: `${SERVER_URL}/oauth/signin`,
    params: {
        'provider': provider,
        'code': code,
        'state': state,
    },
    withCredentials: true,
})

export const getProfile = () => axios({
    method: 'GET',
    url: `${SERVER_URL}/oauth/profile`,
    withCredentials: true,
})

export const signOut = () => axios({
    method: 'GET',
    url: `${SERVER_URL}/oauth/signout`,
    withCredentials: true,
})