import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './../components/LoginForm';
import RegisterForm from './../components/RegisterForm';

export default function WelcomeView() {

    // useSelector(({auth}) => {}) here auth is the key from store 

    const user = useSelector(({ auth }) => auth.user)

    const [isLoginView, setIsLogin] = useState(true);
    const optInText = isLoginView ?
        ['Need an account?', 'Register'] :
        ['Already Registered?', 'Login']

    if (user) {
        return <Redirect to="/home" />
    }

    return (
        <div className="centered-view">
            <div className="centered-container">
                {isLoginView ? <LoginForm /> : <RegisterForm />}
                <small className="form-text text-muted mt-2">{optInText[0]}
                    <span
                        onClick={() => setIsLogin(!isLoginView)}
                        className="btn-link ml-2">{optInText[1]}</span></small>
            </div>
        </div>
    )
}
