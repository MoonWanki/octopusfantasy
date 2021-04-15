import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'qs';
import { requestSignIn } from '~/api/authApi';
import { Loading } from '~/components';

interface Props extends RouteComponentProps {}

export default function LoginCallback(props: Props)
{
    const { code, state } = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    if (!code || !state || typeof code != 'string' || typeof state != 'string')
    {
        alert('잘못된 접근입니다!');
        window.location.replace('/');
        return <></>;
    }

    const { provider, url } = qs.parse(atob(state));
    if (!provider || !url || typeof provider != 'string' || typeof url != 'string')
    {
        alert('잘못된 접근입니다!');
        window.location.replace('/');
        return <></>;
    }

    requestSignIn(provider, code, state)
    .then(res => {
        window.location.replace(url);
    }).catch(err => {
        alert(`로그인에 실패하였습니다.`);
        window.location.replace(url);
    });

    return (
        <Loading message={'로그인 중입니다...'} />
    );
}
