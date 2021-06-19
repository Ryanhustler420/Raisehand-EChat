import React from 'react';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import WelcomeView from './views/WelcomeView';
import SettingsView from './views/SettingsView';

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

export default function App() {
    return (
        <Provider store={store}>
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
        </Provider>
    )
}