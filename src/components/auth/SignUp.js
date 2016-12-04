import React from 'react';
import ReactDOM from 'react-dom';
import phone from 'phone';
import Validation from 'react-validation';
import { Link } from 'react-router';

import AddressAutocomplete from '../inputs/AddressAutocomplete';
import ErrorSubmit from '../inputs/ErrorSubmit';
import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);

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
            },
            request: this.props.request
        }
    }

    changePage(offset) {
        let nextPage = (this.state.page + offset) % 2;
        this.setState({
            page: nextPage
        });
    }

    nextPage() {
        this.changePage(1);
    }

    previousPage() {
        this.changePage(-1);
    }

    handleSubmit() {
        let formData = this.state.user;
        formData.business_phone_number = phone(formData.business_phone_number)[0].slice(-10);

        this.setState({
            request: {
                open: true,
                errors: {}
            }
        });
        let url = `${process.env.API_DOMAIN}/auth/registration/business/`,
            ok;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(function(response) {
            ok = response.ok;
            return response.json()
        }).then(function(values) {
            if (!ok) {
                throw values;
            }
            return values;
        }).then(user => {
            this.setState({
                request: {
                    open: false,
                    errors: {}
                }
            });
            auth.login(formData.email, formData.password1);
        }).catch(err => {
            this.setState({
                request: {
                    open: false,
                    errors: err,
                    target: 'signup'
                }
            });
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
                <Form ref="form1" onSubmit={this.validateAndContinue.bind(this, 'form1', this.nextPage)}>
                    <div className="form-grid">
                        <Input key="first_name" containerClassName="span2" errorClassName="failure" type="text" placeholder="First Name" value={this.state.user.first_name} onChange={this.handleValueChange.bind(this, 'first_name')} name="first_name" validations={['required']}/>
                        <Input key="last_name" containerClassName="span2" errorClassName="failure" type="text" placeholder="Last Name" value={this.state.user.last_name} onChange={this.handleValueChange.bind(this, 'last_name')} name="last_name" validations={['required']}/>
                        <Input key="email" containerClassName="span2" errorClassName="failure" type="email" placeholder="Email" value={this.state.user.email} onChange={this.handleValueChange.bind(this, 'email')} name="email" validations={['required', 'email']}/>
                        <Input key="position" containerClassName="span2" errorClassName="failure" type="text" placeholder="Position" value={this.state.user.job_title} onChange={this.handleValueChange.bind(this, 'job_title')} name="job_title" validations={[]}/>
                        <div className="span4">
                            <div className="form-grid--row">
                                <Input key="password1" containerClassName="span2" errorClassName="failure" type="password" placeholder="Password" value={this.state.user.password1} onChange={this.handleValueChange.bind(this, 'password1')} name="password1" validations={['required', 'password', 'min_len_8']}/>
                                <Input key="password2" containerClassName="span2" errorClassName="failure" type="password" placeholder="Confirm Password" value={this.state.user.password2} onChange={this.handleValueChange.bind(this, 'password2')} name="password2" validations={['required']}/>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Continue" />
                </Form>
            </div>
        );
        let businessSection = (
            <div className="card--content pager--display">
                <h3>Business</h3>
                <Form ref="businessForm" onSubmit={this.validateAndContinue.bind(this, 'businessForm', this.handleSubmit)}>
                    <div className="form-grid">
                        <Input key="business_name" containerClassName="span2" errorClassName="failure" type="text" placeholder="Business Name" value={this.state.user.business_name} onChange={this.handleValueChange.bind(this, 'business_name')} name='business_name' validations={['required']}/>
                        <Input key="business_phone_number" containerClassName="span2" errorClassName="failure" type="text" placeholder="Phone Number" value={this.state.user.business_phone_number} onChange={this.handleValueChange.bind(this, 'business_phone_number')} name='business_phone_number' validations={['required', 'phone']}/>
                    </div>
                    <AddressAutocomplete className="form-grid" onPlaceSelect={this.handlePlaceSelect.bind(this)} />
                    <a className="button" onClick={this.previousPage} style={{marginRight:'1em', display:'inline'}}>Back</a>
                    <ErrorSubmit id="signup" cta="Sign Up" {...this.state.request} />
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