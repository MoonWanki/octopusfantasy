import React, { useEffect } from 'react';
import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import About from '~/pages/About';
import PostScroller from '~/pages/PostScroller';
import LoginCallback from '~/pages/LoginCallback';
import NotFound from '~/pages/NotFound';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/reducers/user';

export default function App()
{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}
