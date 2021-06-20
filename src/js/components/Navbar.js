import React from 'react';
import BackButton from './shared/BackButton';
import SettingButton from './shared/SettingButton';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/auth-actions'

export default function Navbar({ canGoBack }) {

    const dispatch = useDispatch()
    const user = useSelector(({ auth }) => auth.user)

    return (
        <div className="chat-navbar">
            <nav className="chat-navbar-inner">
                <div className="chat-navbar-inner-left">
                    <BackButton canGoBack={canGoBack} />
                    <SettingButton />
                </div>
                <div className="chat-navbar-inner-right">
                    {user &&
                        <>
                            <img className="avatar mr-2" src={user.avatar}></img>
                            <span className="logged-in-user">Hi, {user.username}</span>
                            <button
                                onClick={() => dispatch(logout())}
                                className="btn btn-outline-danger ml-3">Logout</button>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}