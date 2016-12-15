import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';

import AddressAutocomplete from '../inputs/AddressAutocomplete';
import ErrorSubmit from '../inputs/ErrorSubmit';
import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleImageUpdate = this.handleImageUpdate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.validateAndContinue = this.validateAndContinue.bind(this);

    let dollarsSpent;
    if (props.business.avg_customer_spent) dollarsSpent = props.business.avg_customer_spent / 100;
    this.state = {
      profile: {
        name: props.business.name,
        phone: props.business.phone,
        avg_customer_spent: [dollarsSpent].join(''),
        avg_party_size: [props.business.avg_party_size].join('')
      },
      location: Object.assign({}, props.business.location),
      image: {
        preview: props.business.thumbnail
      }
    }
  }

  handleProfileUpdate(e) {
    e.preventDefault();

    let formData = Object.assign({}, this.state.profile);
    formData.location = Object.assign({}, this.state.location);

    return this.props.onUpdateBusiness(formData);
  }

  handleImageSelect(accepted, rejected) {
    if (accepted.length > 0) {
      let chosen = accepted[0];
      this.setState({
        image: chosen
      })
    }
  }

  handleImageUpdate(e) {
    e.preventDefault();

    return new Promise((resolve, reject) => {
      if (this.state.image.name) {
        let formData = new FormData();
        formData.append('image', this.state.image);

        this.props.onUpdateBusinessImage(formData).then((nextVal) => {
          resolve(nextVal);
        });
      } else {
        resolve(true);
      }
    });
  }

  handleSave(e) {
    e.preventDefault();

    this.handleProfileUpdate(e).then((profileVal) => {
      if (Object.keys(this.props.request.errors).length > 0) {
        throw new Error('Error updating profile');
      }
      return this.handleImageUpdate(e);
    }).then((imageVal) => {
      if (Object.keys(this.props.request.errors).length > 0) {
        throw new Error('Error updating profile image');
      }
      return true;
    }).then((success) => {
      this.props.router.push('/dashboard');
    }).catch((err) => {
      console.log(err);
    })
  }

  handleCancel(e) {
    e.preventDefault();

    this.props.router.push('/dashboard');
  }

  onPlaceSelect(place) {
    for (let component in place) {
      this.onValueChange('location', component, {target:{value:place[component]}});
    }
  }

  onValueChange(key, attr, event) {
    this.state[key][attr] = event.target.value;
    this.setState({
      [key]: this.state[key]
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
        <div className="card wide">
          <h2 className="card--header">
            Profile
          </h2>
          <div className="card--content">
            <Form ref="profileForm" onSubmit={this.validateAndContinue.bind(this, 'profileForm', this.handleSave)}>
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
                  Average Customer Spent ($)
                  <Input key="avg_customer_spent" containerClassName="span4" errorClassName="failure" type="text" placeholder="Average Customer Spent" value={this.state.profile.avg_customer_spent} onChange={this.onValueChange.bind(this, 'profile', 'avg_customer_spent')} name='avg_customer_spent' validations={['required', 'decimal']}/>
                </label>
                <label className="span2">
                  Average Party Size
                  <Input key="avg_party_size" containerClassName="span4" errorClassName="failure" type="text" placeholder="Average Party Size" value={this.state.profile.avg_party_size} onChange={this.onValueChange.bind(this, 'profile', 'avg_party_size')} name='avg_party_size' validations={['required', 'integer']}/>
                </label>
                <label className="span2">
                  <p className="span4">Select Image</p>
                  <Dropzone onDrop={this.handleImageSelect}>
                    <div style={{padding:10}}>Try dropping some files here, or click to select files to upload.</div>
                  </Dropzone>
                </label>
                <label className="span2">
                  <p className="span4">Preview</p>
                  <img className="span3" src={this.state.image.preview} />
                </label>
              </div>
              <ErrorSubmit className="span2" id="update-business" {...this.props.request} cta="Save" />
              <button className="button span2" style={{marginLeft:'1em'}} onClick={this.handleCancel}>Cancel</button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;