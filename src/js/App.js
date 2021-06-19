import React from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import SettingsView from './views/SettingsView';

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
    return (
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
                    {/* "/" should be last route */}
                    <Route path="/" exact>
                        <HomeView />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}