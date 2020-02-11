import React, { Component } from 'react';
import '../sass/LoginForm.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onLoginAttempt({
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value
        });
        this.emailInput.current.value = "";
        this.passwordInput.current.value = "";
    }

    render() {

        return (
            <div className="LoginForm">
                <h1 className="title">TimeBoxLogin</h1>
                <form onSubmit={this.handleSubmit}>
                <div className="error">{this.props.errorMessage}</div>
                    <label htmlFor="login">Login:
                        <input
                            defaultValue="radoslaw.grzymala@hotmail.com"
                            type="text"
                            ref={this.emailInput}
                        />
                    </label>
                    <label htmlFor="pass">Hasło:
                        <input
                            defaultValue="Napohybel123@"
                            type="password"
                            ref={this.passwordInput}
                        />
                    </label>
                    <button type="submit" >Zaloguj</button>
                </form>

            </div>
        )
    }
}

export default LoginForm;

