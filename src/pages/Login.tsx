import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import qs from 'qs';
import './Login.scss';

interface Props extends RouteComponentProps {}

export default function Login(props: Props)
{
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const previousUrl = qs.parse(props.location.search, { ignoreQueryPrefix: true }).url as string || '/';
    const userFetchIsSuccess = useSelector((state: RootState) => state.user.fetchStatus.isSuccess);

    // when user signed in
    if(userFetchIsSuccess){
        window.location.replace(previousUrl);
        return <></>;
    }

    // when user not signed in
    const REDIRECT_URI = `${window.location.origin}/callback`;

    return (
        <div className='login-page-wrapper'>
            <div className='login-page-inner'>
                <Link to='/'>
                    <div className='login-page-home-button'/>
                </Link>
                <div className='login-button-container'>
                    <a href={`https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NAVER_API_KEY}&redirect_uri=${REDIRECT_URI}&state=${encodeURIComponent(btoa(`provider=NAVER&url=${previousUrl}`))}&response_type=code`}>
                        <div className='login-button login-button-naver'/>
                    </a>
                    <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&state=${encodeURIComponent(btoa(`provider=KAKAO&url=${previousUrl}`))}&response_type=code`}>
                        <div className='login-button login-button-kakao'/>
                    </a>
                </div>
            </div>
        </div>
    );
}
