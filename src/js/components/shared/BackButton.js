import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BackButton({canGoBack}) {

    const history = useHistory()

    return (
        <>
            {canGoBack && <button
                onClick={() => history.goBack()}
                className="btn btn-outline-primary">Back</button>}
        </>
    );
}
