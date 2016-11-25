import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';
import { Link } from 'react-router';

import AddressAutocomplete from '../inputs/AddressAutocomplete';
import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextPage = this.nextPage.bind(this);

        this.state = {
            page: props.page ? props.page % 2 : 0,
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

    nextPage(e) {
        e.preventDefault();

        let nextPage = this.state.page + 1 % 2;
        this.setState({
            page: nextPage
        });
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

    handleValueChange(attr, event) {
        let user = this.state.user;
        user[attr] = event.target.value;
        this.setState({
            user
        });
    }

    handlePlaceSelect(place) {
        let user = this.state.user;
        for (var component in place) {
            user[`location_${component}`] = place[component];
        }
        this.setState({
            user
        });
    }

    render() {
        let accountSection = (
            <div className="card--content pager--display">
                <h3>Account</h3>
                <Form onSubmit={this.nextPage}>
                    <div className="form-grid">
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="First Name" value={this.state.user.first_name} onChange={this.handleValueChange.bind(this, 'first_name')} name="first_name" validations={['required']}/>
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Last Name" value={this.state.user.last_name} onChange={this.handleValueChange.bind(this, 'last_name')} name="last_name" validations={['required']}/>
                        <Input containerClassName="span2" errorClassName="failure" type="email" placeholder="Email" value={this.state.user.email} onChange={this.handleValueChange.bind(this, 'email')} name="email" validations={['required', 'email']}/>
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Position" value={this.state.user.job_title} onChange={this.handleValueChange.bind(this, 'job_title')} name="job_title" validations={[]}/>
                        <div className="span4">
                            <div className="form-grid--row">
                                <Input containerClassName="span2" errorClassName="failure" type="password" placeholder="Password" value={this.state.user.password1} onChange={this.handleValueChange.bind(this, 'password1')} name="password1" validations={['required', 'password', 'min_len_8']}/>
                                <Input containerClassName="span2" errorClassName="failure" type="password" placeholder="Confirm Password" value={this.state.user.password2} onChange={this.handleValueChange.bind(this, 'password2')} name="password2" validations={['required']}/>
                            </div>
                        </div>
                    </div>
                    <Button>Continue</Button>
                </Form>
            </div>
        );
        let businessSection = (
            <div className="card--content pager--display">
                <h3>Business</h3>
                <Form onSubmit={this.handleSubmit}>
                    <div className="form-grid">    
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Business Name" value={this.state.user.business_name} onChange={this.handleValueChange.bind(this, 'business_name')} name='business_name' validations={['required']}/>
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Phone Number" value={this.state.user.business_phone_number} onChange={this.handleValueChange.bind(this, 'business_phone_number')} name='business_phone_number' validations={[]}/>
                    </div>
                    <AddressAutocomplete className="form-grid" onPlaceSelect={this.handlePlaceSelect.bind(this)} />
                    <Button>Sign Up</Button>
                </Form>
            </div>
        );
        let pages = [accountSection, businessSection];
        return (
            <div className="card-container">
                <div className="card wide">
                    <h2 className="card--header">
                        Sign Up
                    </h2>
                    <p className="card--sub-header">
                        <Link to="/login">Already have an account?</Link >
                    </p>
                    <div className="pager">
                        <div className="pager--container">
                            {pages[this.state.page]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;