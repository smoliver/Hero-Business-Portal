import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';

import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class SignUp extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            user: {
                email: '',
                password1: '',
                password2: '',
                first_name: '',
                last_name: '',
                job_title: '',
                business_name: '',
                business_phone_number: '',
                location_route: '',
                location_city: '',
                location_state: '',
                location_zipcode: '',
                location_latitude: '',
                location_longitude: ''
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let formData = this.state.user;

        let url = `${process.env.API_DOMAIN}/auth/registration/business/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(function(response) {
            auth.login(formData.email, formData.password1);
        }).catch(function(err) {
            console.log(err);
        });
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
                <h2>Sign Up</h2>
                <div>
                    <label>
                        Email*
                        <Input type='email' value={this.state.user.email} onChange={this.onValueChange.bind(this, 'email')} name='email' validations={['required', 'email']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Password*
                        <Input type='password' value={this.state.user.password1} onChange={this.onValueChange.bind(this, 'password1')} name='password1' validations={['required', 'password', 'min_len_8']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Confirm Password*
                        <Input type='password' value={this.state.user.password2} onChange={this.onValueChange.bind(this, 'password2')} name='password2' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        First Name*
                        <Input type='text' value={this.state.user.first_name} onChange={this.onValueChange.bind(this, 'first_name')} name='first_name' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Last Name*
                        <Input type='text' value={this.state.user.last_name} onChange={this.onValueChange.bind(this, 'last_name')} name='last_name' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Job Title
                        <Input type='text' value={this.state.user.job_title} onChange={this.onValueChange.bind(this, 'job_title')} name='job_title' validations={[]}/>
                    </label>
                </div>
                <div>
                    <label>
                        Business Name*
                        <Input type='text' value={this.state.user.business_name} onChange={this.onValueChange.bind(this, 'business_name')} name='business_name' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Business Phone Number
                        <Input type='text' value={this.state.user.business_phone_number} onChange={this.onValueChange.bind(this, 'business_phone_number')} name='business_phone_number' validations={[]}/>
                    </label>
                </div>
                <div>
                    <label>
                        Address
                        <Input type='text' value={this.state.user.location_route} onChange={this.onValueChange.bind(this, 'location_route')} name='location_route' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        City
                        <Input type='text' value={this.state.user.location_city} onChange={this.onValueChange.bind(this, 'location_city')} name='location_city' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        State
                        <Input type='text' value={this.state.user.location_state} onChange={this.onValueChange.bind(this, 'location_state')} name='location_state' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Postal Code
                        <Input type='text' value={this.state.user.location_zipcode} onChange={this.onValueChange.bind(this, 'location_zipcode')} name='location_zipcode' validations={['required']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Latitude
                        <Input type='text' value={this.state.user.location_latitude} onChange={this.onValueChange.bind(this, 'location_latitude')} name='location_latitude' validations={['required', 'decimal']}/>
                    </label>
                </div>
                <div>
                    <label>
                        Longitude
                        <Input type='text' value={this.state.user.location_longitude} onChange={this.onValueChange.bind(this, 'location_longitude')} name='location_longitude' validations={['required', 'decimal']}/>
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