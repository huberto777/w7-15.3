import React from "react";

import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationAPI from "../api/FakeAuthenticationApi";
import jwt from "jsonwebtoken";

class App extends React.Component {
  state = {
    accessToken: null,
    expiresIn: null,
    previousLoginAttemptFailed: false,
  };
  getAccessToken() {
    this.setState({
      accessToken: localStorage.getItem("accessToken"),
      expiresIn: parseInt(localStorage.getItem("expiresIn") / 100000),
      previousLoginAttemptFailed: false,
    });
  }

  componentDidMount() {
    this.getAccessToken();
  }

  isUserLoggedIn() {
    return !!this.state.accessToken;
  }

  getUserEmail() {
    const decodedToken = jwt.decode(this.state.accessToken);
    return decodedToken.email;
  }

  handleLoginAttempt = (credentials) => {
    AuthenticationAPI.login(credentials)
      .then(({ accessToken }) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("expiresIn", jwt.decode(accessToken).exp);
        this.getAccessToken();
      })
      .catch(() => {
        this.setState({
          previousLoginAttemptFailed: true,
        });
      });
  };

  handleLogout = () => {
    this.setState({
      accessToken: localStorage.removeItem("accessToken"),
      expiresIn: localStorage.removeItem("expiresIn"),
      previousLoginAttemptFailed: false,
    });
  };

  render() {
    return (
      <div className="App">
        <ErrorBoundary message="Coś nie działa w całej aplikacji">
          {this.isUserLoggedIn() ? (
            <>
              <header className="header">
                Witaj {this.getUserEmail()}
                <a
                  onClick={this.handleLogout}
                  className="header__logout-link"
                  href="#"
                >
                  Wyloguj się
                </a>
              </header>
              <TimeboxList accessToken={this.state.accessToken} />
              <EditableTimebox />
            </>
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
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
