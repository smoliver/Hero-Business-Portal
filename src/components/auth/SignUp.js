import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';
import serialize from 'form-serialize';

let { Form, Input, Button } = Validation.components;

class SignUp extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let formData = JSON.stringify(serialize(ReactDOM.findDOMNode(this.refs.signUpForm), {hash: true}));

        let url = `${process.env.API_DOMAIN}/auth/registration/business/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        }).then(function(response) {
            console.log(response);
        }).catch(function(err) {
            console.log(err);
        });
    }

    render() {
        return (
            <Form ref='signUpForm' onSubmit={this.handleSubmit}>
                <h2>Sign Up</h2>
                <div>
                    <label>
                        Email*
                        <Input value='email@email.com' name='email' validations={['required', 'email']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Password*
                        <Input type='password' value='' name='password1' validations={['required', 'password', 'min_len_8']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Confirm Password*
                        <Input type='password' value='' name='password2' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        First Name*
                        <Input type='text' value='' name='first_name' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Last Name*
                        <Input type='text' value='' name='last_name' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Job Title
                        <Input type='text' value='' name='job_title' validations={[]}/>
                    </label>
                </div>
                <div>
                    <label>
                        Business Name*
                        <Input type='text' value='' name='business_name' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Business Phone Number
                        <Input type='text' value='' name='business_phone_number' validations={[]}/>
                    </label>
                </div>
                <div>
                    <label>
                        Address
                        <Input type='text' value='' name='location_route' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        City
                        <Input type='text' value='' name='location_city' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        State
                        <Input type='text' value='' name='location_state' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Postal Code
                        <Input type='text' value='' name='location_zipcode' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Latitude
                        <Input type='text' value='' name='location_latitude' validations={['required', 'decimal']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Longitude
                        <Input type='text' value='' name='location_longitude' validations={['required', 'decimal']}/>
                    </label>
                </div>
                <div>
                    <Button>Submit</Button>
                </div>
            </Form>
        )
    }
}

export default SignUp;