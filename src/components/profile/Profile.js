import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';
import { Link } from 'react-router';

import AddressAutocomplete from '../inputs/AddressAutocomplete';
import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.resetProfile = this.resetProfile.bind(this);

    this.state = {
      profile: {
        name: props.business.name,
        phone: props.business.phone,
        avg_customer_spent: [props.business.avg_customer_spent].join(''),
        avg_party_size: [props.business.avg_party_size].join('')
      },
      location: Object.assign({}, props.business.location)
    }
    this.state.originalProfile = Object.assign({}, this.state.profile);
  }

  handleProfileUpdate(e) {
    e.preventDefault();

    let formData = this.state.profile;
    formData.location = this.state.location;

    this.props.onUpdateBusiness(formData);
  }

  handlePictureUpdate(e) {
    e.preventDefault();

    let url = `${process.env.API_DOMAIN}/auth/registration/business/${this.props.business.id}/`;
    fetch(url, {
      method: 'PUT',
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

  onPlaceSelect(place) {
    for (let component in place) {
      this.onValueChange('location', component, {target:{value:place[component]}});
    }
  }

  resetProfile(e) {
    e.preventDefault();

    this.setState({
      profile: Object.assign({}, this.state.originalProfile)
    });
  }

  onValueChange(key, attr, event) {
    this.state[key][attr] = event.target.value;
    this.setState({
      [key]: this.state[key]
    });
  }

  render() {
    return (
      <div className="card-container">
        <div className="card wide">
          <h2 className="card--header">
            Profile
          </h2>
          <div className="card--content">
            <Form ref="profileForm" onSubmit={this.handleProfileUpdate}>
              <h3>Business</h3>
              <div className="form-grid">
                <label className="span2">
                  Name
                  <Input key="name" containerClassName="span4" errorClassName="failure" type="text" placeholder="Business Name" value={this.state.profile.name} onChange={this.onValueChange.bind(this, 'profile', 'name')} name='name' validations={['required']}/>
                </label>
                <label className="span2">
                  Phone
                  <Input key="phone" containerClassName="span4" errorClassName="failure" type="text" placeholder="Phone Number" value={this.state.profile.phone} onChange={this.onValueChange.bind(this, 'profile', 'phone')} name='phone' validations={['required', 'phone']}/>
                </label>
              </div>
              <label className="span4">
                Address
                <AddressAutocomplete className="form-grid" location={this.props.business.location} onPlaceSelect={this.onPlaceSelect.bind(this)} />
              </label>
              <div className="form-grid">
                <label className="span2">
                  Average Customer Spent (cents)
                  <Input key="avg_customer_spent" containerClassName="span4" errorClassName="failure" type="text" placeholder="Average Customer Spent" value={this.state.profile.avg_customer_spent} onChange={this.onValueChange.bind(this, 'profile', 'avg_customer_spent')} name='avg_customer_spent' validations={['required', 'integer']}/>
                </label>
                <label className="span2">
                  Average Party Size
                  <Input key="avg_party_size" containerClassName="span4" errorClassName="failure" type="text" placeholder="Average Party Size" value={this.state.profile.avg_party_size} onChange={this.onValueChange.bind(this, 'profile', 'avg_party_size')} name='avg_party_size' validations={['required', 'integer']}/>
                </label>
              </div>
              <Button>Update</Button>
              <button onClick={this.resetProfile}>Reset</button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;