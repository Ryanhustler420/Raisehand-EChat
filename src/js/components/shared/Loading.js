import React from 'react';
import Spinner from './Spinner';

export default function Loading({ message = 'Just a moment please' }) {
    return (
        <div className="loading-screen">
            <div className="loading-view">
                <div className="loading-view-container">
                    <div className="mb-3">{message}</div>
                    <Spinner />
                </div>
            </div>
        </div>
    );
}
