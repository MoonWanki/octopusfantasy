import axios from 'axios';

/* ---------- POST ---------- */

export const loadAllPosts = () => axios({
    method: 'GET',
    baseURL: process.env.SERVER_URL,
    url: '/post',
});

export const loadPostsByType = (type: string) => axios({
    method: 'GET',
    baseURL: process.env.SERVER_URL,
    url: `/post?type=${type}`,
});

export const loadPostById = (pid: string|number) => axios({
    method: 'GET',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}`,
});

/* ---------- LIKE ---------- */

export const addLike = (pid: string|number) => axios({
    method: 'POST',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}/like`,
    withCredentials: true,
});

export const deleteLike = (pid: string|number) => axios({
    method: 'DELETE',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}/like`,
    withCredentials: true,
});

/* ---------- COMMENT ---------- */

export const addComment = (pid: string|number, text: string) => axios({
    method: 'POST',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}/comment`,
    data: { text },
    withCredentials: true,
});

export const editComment = (pid: string|number, cid: string|number, text: string) => axios({
    method: 'PUT',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}/comment/${cid}`,
    data: { text },
    withCredentials: true,
});

export const deleteComment = (pid: string|number, cid: string|number) => axios({
    method: 'DELETE',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}/comment/${cid}`,
    withCredentials: true,
});

export const addRecomment = (pid: string|number, cid: string|number, text: string) => axios({
    method: 'POST',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}/comment/${cid}`,
    data: { text },
    withCredentials: true,
});

export const editRecomment = (pid: string|number, cid: string|number, rcid: string|number, text: string) => axios({
    method: 'PUT',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}/comment/${cid}/${rcid}`,
    data: { text },
    withCredentials: true,
});

export const deleteRecomment = (pid: string|number, cid: string|number, rcid: string|number) => axios({
    method: 'DELETE',
    baseURL: process.env.SERVER_URL,
    url: `/post/${pid}/comment/${cid}/${rcid}`,
    withCredentials: true,
});
