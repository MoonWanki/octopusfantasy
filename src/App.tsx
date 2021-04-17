import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';

const Home = lazy(() => import('~/pages/Home'));
const Login = lazy(() => import('~/pages/Login'));
const About = lazy(() => import('~/pages/About'));
const PostScroller = lazy(() => import('~/pages/PostScroller'));
const LoginCallback = lazy(() => import('~/pages/LoginCallback'));
const NotFound = lazy(() => import('~/pages/NotFound'));
import { useDispatch } from 'react-redux';
import { fetchUser } from '~/store/reducers/user';
import { Loading } from '~/components';

export default function App()
{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <BrowserRouter>
            <Suspense fallback={<Loading message={'로딩 중입니다...'} />}>
                <Switch>
                    <Route exact path="/"           component={Home} />
                    <Route path="/login"            component={Login} />
                    <Route path="/about"            component={About} />
                    <Route path="/callback"         component={LoginCallback} />

                    <Route path="/music"            render={(props: RouteComponentProps) => <PostScroller {...props} type='music'/>} />
                    <Route path="/entertainment"    render={(props: RouteComponentProps) => <PostScroller {...props} type='entertainment'/>} />
                    <Route path="/daigasso"         render={(props: RouteComponentProps) => <PostScroller {...props} type='daigasso'/>} />
                    <Route path="/gamevideo"        render={(props: RouteComponentProps) => <PostScroller {...props} type='gamevideo'/>} />
                    <Route path="/post/:pid"        component={PostScroller} />

                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}
