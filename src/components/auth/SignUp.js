import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';
import { Link } from 'react-router';

import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextPage = this.nextPage.bind(this);

        this.state = {
            page: props.page ? props.page % 3 : 0,
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

        let nextPage = this.state.page + 1;
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

    onValueChange(attr, event) {
        let user = this.state.user;
        user[attr] = event.target.value;
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
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="First Name" autocomplete="fname" value={this.state.user.first_name} onChange={this.onValueChange.bind(this, 'first_name')} name="first_name" validations={['required']}/>
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Last Name" autocomplete="lname" value={this.state.user.last_name} onChange={this.onValueChange.bind(this, 'last_name')} name="last_name" validations={['required']}/>
                        <Input containerClassName="span2" errorClassName="failure" type="email" placeholder="Email" autocomplete="email" value={this.state.user.email} onChange={this.onValueChange.bind(this, 'email')} name="email" validations={['required', 'email']}/>
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Position" value={this.state.user.job_title} onChange={this.onValueChange.bind(this, 'job_title')} name="job_title" validations={[]}/>
                        <div className="span4">
                            <div className="form-grid--row">
                                <Input containerClassName="span2" errorClassName="failure" type="password" placeholder="Password" value={this.state.user.password1} onChange={this.onValueChange.bind(this, 'password1')} name="password1" validations={['required', 'password', 'min_len_8']}/>
                                <Input containerClassName="span2" errorClassName="failure" type="password" placeholder="Confirm Password" value={this.state.user.password2} onChange={this.onValueChange.bind(this, 'password2')} name="password2" validations={['required']}/>
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
                <Form onSubmit={this.nextPage}>
                    <div className="form-grid">    
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Business Name" value={this.state.user.business_name} onChange={this.onValueChange.bind(this, 'business_name')} name='business_name' validations={['required']}/>
                        <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Phone Number" value={this.state.user.business_phone_number} onChange={this.onValueChange.bind(this, 'business_phone_number')} name='business_phone_number' validations={[]}/>
                    </div>
                    <Button>Continue</Button>
                </Form>
            </div>
        );
        let addressSection = (
            <div className="card--content pager--display">
                <Form onSubmit={this.handleSubmit}>
                    <h3>Business Address</h3>
                    <div className="form-grid">
                        <div className="span2">
                            <Input containerClassName="span4" errorClassName="failure" type="text" placeholder="Address" value={this.state.user.location_route} onChange={this.onValueChange.bind(this, 'location_route')} name='location_route' validations={['required']}/>
                            <Input containerClassName="span4" errorClassName="failure" type="text" placeholder="City" value={this.state.user.location_city} onChange={this.onValueChange.bind(this, 'location_city')} name='location_city' validations={['required']}/>
                            <div className="form-grid--row">
                                <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="State" value={this.state.user.location_state} onChange={this.onValueChange.bind(this, 'location_state')} name='location_state' validations={['required']}/>
                                <Input containerClassName="span2" errorClassName="failure" type="text" placeholder="Postal Code" value={this.state.user.location_zipcode} onChange={this.onValueChange.bind(this, 'location_zipcode')} name='location_zipcode' validations={['required']}/>
                            </div>
                        </div>
                    </div>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
        let pages = [accountSection, businessSection, addressSection];
        return (
            <div className="card-container">
                <div className="card wide">
                    <h2 className="card--header">
                        Sign Up
                    </h2>
                    <p className="card--sub-header">
                        <Link to="/login">Already have an account?</Link>
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