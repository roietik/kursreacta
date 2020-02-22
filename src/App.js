import React from "react";
import "./App.scss";
import LoginForm from "./components/LoginForm";
import AuthenticationAPI from "./api/FetchAuthApi";
import AuthenticationContext from "./contexts/AuthenticationContext";

const AuthenticatedApp = React.lazy(() =>
  import("./components/AuthenticatedApp")
);

class App extends React.Component {
  state = {
    accessToken: null,
    previousLoginAttemptFailed: false
  };

  isUserLogin = () => {
    return !!this.state.accessToken;
  };

  handleLoginAttempt = credentials => {
    AuthenticationAPI.login(credentials)
      .then(({ accessToken }) => {
        this.setState({
          accessToken,
          previousLoginAttemptFailed: false
        });
      })
      .catch(() => {
        this.setState({
          previousLoginAttemptFailed: true
        });
      });
  };

  handleLogout = () => {
    this.setState({
      accessToken: null,
      previousLoginAttemptFailed: false
    });
  };

  render() {
    return (
      <div className="App">
        {this.isUserLogin() ? (
          <AuthenticationContext.Provider
            value={{
              accessToken: this.state.accessToken,
              handleLogout: this.handleLogout
            }}
          >
            <React.Suspense fallback={"... Loading"}>
              <AuthenticatedApp />
            </React.Suspense>
          </AuthenticationContext.Provider>
        ) : (
          <LoginForm
            errorMessage={
              this.state.previousLoginAttemptFailed
                ? "Nie udało się zalogować"
                : null
            }
            onLoginAttempt={this.handleLoginAttempt}
          />
        )}
      </div>
    );
  }
}

export default App;
