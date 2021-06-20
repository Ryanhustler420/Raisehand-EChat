import React from 'react';

import { Link, useLocation } from 'react-router-dom'

export default function SettingButton() {
    const location = useLocation();
    return (
        <>
            {
                !location.pathname.includes('settings') &&
                !location.pathname.includes('chat') &&
                !location.pathname.includes('chatCreate') &&
                (<Link to="/settings" className="btn btn-outline-success">Settings</Link>)
            }
        </>
    );
}
