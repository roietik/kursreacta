import React from 'react';
import jwt from 'jsonwebtoken';
import AuthenticationContext from '../contexts/AuthenticationContext';


function UserGreeting(props) {
    
    return (
        <AuthenticationContext.Consumer>
            {
                ({ accessToken, handleLogout }) => (
                    <>
                        <p>Użytkownik: {getUserEmail(accessToken)}
                            <a
                                onClick={() => {
                                    handleLogout();
                                    document.title = "Timer";
                                }} href="/#"
                            >
                                Wyloguj
                            </a>
                        </p>
                    </>
                )
            }
        </AuthenticationContext.Consumer>
    )
}

export default UserGreeting;

function getUserEmail(accessToken) {
    const decodedToken = jwt.decode(accessToken);
    document.title = `${document.title}: ${decodedToken.email}`
    return decodedToken.email;
}