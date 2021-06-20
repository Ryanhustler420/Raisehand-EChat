import React, { useEffect } from 'react';

import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import WelcomeView from './views/WelcomeView';
import SettingsView from './views/SettingsView';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { listenToAuthChanges } from './actions/auth-actions';
import StoreProvider from './store/StoreProvider';
import Loading from './components/shared/Loading';

function EChat() {

    const dispatch = useDispatch();
    const isChecking = useSelector(({ auth }) => auth.isChecking);
 
    const alertOnlineStatus = () =>
        alert(navigator.onLine ? 'Online' : 'Offline')

    useEffect(() => {
        const unsubscribeAuthStateListener = dispatch(listenToAuthChanges())
        window.addEventListener('online', alertOnlineStatus)
        window.addEventListener('offline', alertOnlineStatus)

        // will be called when this componet gets destroyed
        return function() {
            unsubscribeAuthStateListener();
            window.removeEventListener('online', alertOnlineStatus)
            window.removeEventListener('offline', alertOnlineStatus)
        }

    }, [dispatch])

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