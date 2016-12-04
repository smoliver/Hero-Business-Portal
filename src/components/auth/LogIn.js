import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Validation from 'react-validation';

import ErrorSubmit from '../inputs/ErrorSubmit';
import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateAndContinue = this.validateAndContinue.bind(this);

        this.state = {
            user: {
                email: '',
                password: '',
            },
            request: props.request
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            request: {
                open: true,
                errors: {}
            }
        });
        console.log(auth.getBusinessId());
        auth.login(this.state.user.email, this.state.user.password, (status) => {
            if (status.loggedIn) {
                this.setState({
                    request: {
                        open: false,
                        errors: {}
                    }
                });
                console.log('Biz Id', status.businessId);
                this.props.onLogin(status.businessId);
            } else {
                this.setState({
                    request: {
                        open: false,
                        errors: {
                            email: ['Could not find username/password combo']
                        },
                        target: 'login'
                    }
                });
            }
        });
    }

    onValueChange(attr, event) {
        let user = this.state.user;
        user[attr] = event.target.value;
        this.setState({
            user
        });
    }

    validateAndContinue(name, next, e) {
        e.preventDefault();

        var invalid = this.refs[name].validateAll();
        if (Object.keys(invalid).length === 0) {
            // Valid
            next(e);
        }
    }

    render() {
        return (
            <div className="card-container">
                <Form ref="loginForm" className="card" onSubmit={this.validateAndContinue.bind(this, 'loginForm', this.handleSubmit)}>
                    <h2 className="card--header">
                        Log In
                    </h2>
                    <p className="card--sub-header">
                        <Link to="/signup">Create an Account</Link>
                        <a href={`${process.env.API_DOMAIN}/auth/password/reset/`} target="_blank">Forgot your password?</a>
                    </p>
                    <div className="card--content form-grid">
                        <Input containerClassName="span4" errorClassName="failure" type="email" placeholder="Email" value={this.state.user.email} onChange={this.onValueChange.bind(this, 'email')} name='email' validations={['required', 'email']}/>
                        <Input containerClassName="span4" errorClassName="failure" type="password" placeholder="Password" value={this.state.user.password} onChange={this.onValueChange.bind(this, 'password')} name='password' validations={['required']}/>
                        <ErrorSubmit id="login" {...this.state.request} cta="Log In" />
                    </div>
                </Form>
            </div>
        )
    }
}

export default LogIn;