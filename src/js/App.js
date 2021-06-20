import React, { useEffect } from 'react';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import WelcomeView from './views/WelcomeView';
import SettingsView from './views/SettingsView';

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux';
import configureStore from './store';
import { listenToAuthChanges } from './actions/auth-actions';

function EChat() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listenToAuthChanges())
    }, [dispatch])

    return (
        <Router>
            <Navbar />
            <div className='content-wrapper'>
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
            </div>
        </Router>
    )
}

const store = configureStore();
export default function App() {
    return (
        <Provider store={store}>
            <EChat />
        </Provider>
    )
}