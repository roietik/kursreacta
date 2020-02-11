import React from 'react';
import Header from '../components/Header';
import TimeBoxList from '../components/TimeBoxList';
import InspirationalQuote from '../components/InspirationalQuote';

function AuthenticatedApp() {
    return (
        <>
            <Header />
            <TimeBoxList />
            <InspirationalQuote/>
        </>
    )
}

export default AuthenticatedApp;
