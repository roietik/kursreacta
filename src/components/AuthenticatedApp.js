import React from 'react';
import Header from '../components/Header';
import TimeBoxesMenager from './TimeBoxesMenager';
import InspirationalQuote from '../components/InspirationalQuote';
import UserGreetings from '../components/UserGreeting';


function AuthenticatedApp() {
    return (
        <>
            <Header>
                <UserGreetings/>
            </Header>
            <TimeBoxesMenager />
            <InspirationalQuote/>
        </>
    )
}

export default AuthenticatedApp;
