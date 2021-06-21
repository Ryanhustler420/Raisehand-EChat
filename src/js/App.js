import React, { useEffect } from 'react';

import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import ChatCreateView from './views/ChatCreateView';

import WelcomeView from './views/WelcomeView';
import SettingsView from './views/SettingsView';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { checkUserConnection } from './actions/connection-actions';
import { listenToConnectionChanges } from './actions/root-actions';
import { listenToAuthChanges } from './actions/auth-actions';
import StoreProvider from './store/StoreProvider';
import Loading from './components/shared/Loading';

function EChat() {

    const dispatch = useDispatch();
    const isChecking = useSelector(({ auth }) => auth.isChecking);
    const isOnline = useSelector(({ root }) => root.isOnline);

    useEffect(() => {
        const unsubscribeAuthStateListener = dispatch(listenToAuthChanges())
        const unsubscribeConnectionChanges = dispatch(listenToConnectionChanges())
        const unsubscribeUserConnections = dispatch(checkUserConnection())

        // will be called when this componet gets destroyed
        return function () {
            unsubscribeAuthStateListener();
            unsubscribeConnectionChanges();
            unsubscribeUserConnections();
        }
    }, [dispatch])

    if (!isOnline) { return <Loading message="Application has been discounnected from the internet" /> }
    if (isChecking) { return <Loading /> }

    return (
        <Router>
            <ContentWrapper>
                <Switch>
                    <Route path="/" exact>
                        <WelcomeView />
                    </Route>
                    <AuthRoute path="/home">
                        <HomeView />
                    </AuthRoute>
                    <AuthRoute path="/chatCreate">
                        <ChatCreateView />
                    </AuthRoute>
                    <AuthRoute path="/chat/:id">
                        <ChatView />
                    </AuthRoute>
                    <AuthRoute path="/settings">
                        <SettingsView />
                    </AuthRoute>
                </Switch>
            </ContentWrapper>
        </Router>
    )
}

// This HOC is responsible for checking the user auth state
// So the they can access the auth specific routes, like /home or /chat/:id
function AuthRoute({ children, ...rest }) {
    const user = useSelector(({ auth }) => auth.user)
    const onlyChild = React.Children.only(children)

    return (<Route
        {...rest} // Providing the props as it is to children
        render={props =>
            user ? React.cloneElement(onlyChild, { ...rest, ...props }) :
                <Redirect to="/" />} />
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