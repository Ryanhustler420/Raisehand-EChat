import React from 'react';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { divide } from 'lodash';

export default function Loading({ message = 'Just a moment please' }) {

    const { isDarkTheme } = useSelector(({ settings }) => settings);

    return (
        <div className={`${isDarkTheme ? 'dark' : 'light'}`}>
            <div className="loading-screen">
                <div className="loading-view">
                    <div className="loading-view-container">
                        <div className="mb-3">{message}</div>
                        <Spinner />
                    </div>
                </div>
            </div>
        </div>
    );
}
