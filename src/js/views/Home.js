import React from 'react';
import JoinChats from './../components/JoinChats';
import ViewTitle from './../components/shared/ViewTitle';
import AvailableChats from './../components/AvailableChats';

export default function HomeView() {
    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinChats />
            </div>
            <div className="col-9 fh">
                <ViewTitle />
                <AvailableChats />
            </div>
        </div>
    )
}