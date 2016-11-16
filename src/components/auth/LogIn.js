import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Validation from 'react-validation';

import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class LogIn extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            user: {
                email: '',
                password: '',
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        auth.login(this.state.user.email, this.state.user.password);
    }

    onValueChange(attr, event) {
        let user = this.state.user;
        user[attr] = event.target.value;
        this.setState({
            user
        });
    }

    render() {
        return (
            <div className="card-container">
                <Form className="card" onSubmit={this.handleSubmit}>
                    <h2 className="card--header">
                        Log In
                    </h2>
                    <p className="card--sub-header">
                        <Link to="/sign-up">Create an Account</Link>
                        <Link>Forgot your password?</Link>
                    </p>
                    <div className="card--content form-grid">
                        <div className="span4">
                            <Input type="email" placeholder="email" value={this.state.user.email} onChange={this.onValueChange.bind(this, 'email')} name='email' validations={['required', 'email']}/>
                        </div>
                        <div className="span4">
                            <Input type="password" value={this.state.user.password} onChange={this.onValueChange.bind(this, 'password')} name='password' validations={['required']}/>
                        </div>
                        <Button>Log In</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default LogIn;