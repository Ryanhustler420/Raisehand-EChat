import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ViewTitle from '../components/shared/ViewTitle';
import JoinChatsList from '../components/JoinChatsList';
import AvailableChatsList from '../components/AvailableChatsList';

import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../actions/chats-actions';
import { withBaseLayout } from './../Hoc/BaseLayout';

import Notifications from '../utils/Notifications';

function HomeView() {

    const dispatch = useDispatch()    
    const joined = useSelector(({ chats }) => chats.joined)
    const available = useSelector(({ chats }) => chats.available)

    // will call only once
    useEffect(() => {
        Notifications.setup()
        dispatch(fetchChats())
    }, [dispatch])

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinChatsList chats={joined} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose Any Channel">
                    <Link className="btn btn-outline-primary" to="/chatCreate" >New</Link>
                </ViewTitle>
                <AvailableChatsList chats={available} />
            </div>
        </div>
    )
}

export default withBaseLayout(HomeView, { canGoBack: false })