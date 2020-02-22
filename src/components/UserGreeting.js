import React from "react";
import jwt from "jsonwebtoken";
import AuthenticationContext from "../contexts/AuthenticationContext";
import "../sass/UserGreeting.scss";

function UserGreeting(props) {
  return (
    <AuthenticationContext.Consumer>
      {({ accessToken, handleLogout }) => (
        <div className="header-info">
          <h1 className="title">Timer</h1>
          <p>
            Użytkownik: {getUserEmail(accessToken)}{" "}
            <a
              onClick={() => {
                handleLogout();
                document.title = "Timer";
              }}
              href="/#"
            >
              Wyloguj
            </a>
          </p>
        </div>
      )}
    </AuthenticationContext.Consumer>
  );
}

export default UserGreeting;

function getUserEmail(accessToken) {
  const decodedToken = jwt.decode(accessToken);
  document.title = `${document.title}: ${decodedToken.email}`;
  return decodedToken.email;
}
