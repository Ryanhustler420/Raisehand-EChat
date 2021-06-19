import React from 'react';

import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
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
                        <Route path="/settings">
                            <SettingsView />
                        </Route>
                        <Route path="/login">
                            <LoginView />
                        </Route>
                        <Route path="/register">
                            <RegisterView />
                        </Route>
                        <Route path="/chat/:id">
                            <ChatView />
                        </Route>
                        {/* "/" should be last route */}
                        <Route path="/" exact>
                            <HomeView />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}