import React from 'react';
import ReactDOM from 'react-dom';
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
            <Form onSubmit={this.handleSubmit}>
                <h2>Log In</h2>
                <div>
                    <label>
                        Email*
                        <Input type='email' value={this.state.user.email} onChange={this.onValueChange.bind(this, 'email')} name='email' validations={['required', 'email']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Password*
                        <Input type='password' value={this.state.user.password} onChange={this.onValueChange.bind(this, 'password')} name='password' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <Button>Log In</Button>
                </div>
            </Form>
        )
    }
}

export default LogIn;