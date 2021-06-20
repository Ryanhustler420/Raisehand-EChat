import React, { useEffect } from 'react';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import WelcomeView from './views/WelcomeView';
import SettingsView from './views/SettingsView';

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { listenToAuthChanges } from './actions/auth-actions';
import StoreProvider from './store/StoreProvider';
import Loading from './components/shared/Loading';

function EChat() {

    const dispatch = useDispatch();
    const isChecking = useSelector(({auth}) => auth.isChecking);

    useEffect(() => {
        dispatch(listenToAuthChanges())
    }, [dispatch])

    if (isChecking) { return <Loading /> }

    return (
        <Router>
            <Navbar />
            <ContentWrapper>
                <Switch>
                    <Route path="/" exact>
                        <WelcomeView />
                    </Route>
                    <Route path="/home">
                        <HomeView />
                    </Route>
                    <Route path="/chat/:id">
                        <ChatView />
                    </Route>
                    <Route path="/settings">
                        <SettingsView />
                    </Route>
                </Switch>
            </ContentWrapper>
        </Router>
    )
}

const ContentWrapper = ({ children }) => <div className='content-wrapper'>{children}</div>

export default function App() {
    return (
        <StoreProvider>
            <EChat />
        </StoreProvider>
    )
}