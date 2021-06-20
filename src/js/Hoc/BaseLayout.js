import React from 'react';
import Navbar from '../components/Navbar';

const getDisplayName = Component => (Component.displayName || Component.name || 'Component');

// Creating HOC
export const withBaseLayout = (Component, config) => (props) => {

    // we can get the name of the component inside HOC wrapper
    const componentName = getDisplayName(Component)

    return (
        <>
            <Navbar {...config} componentName={componentName} />
            <Component {...props} componentName={componentName} />
        </>
    )
}