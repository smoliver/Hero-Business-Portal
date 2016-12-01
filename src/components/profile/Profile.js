import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';

import AddressAutocomplete from '../inputs/AddressAutocomplete';
import auth from '../../auth';

let { Form, Input, Button } = Validation.components;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.resetProfile = this.resetProfile.bind(this);
    this.handleImageSelect = this.handleImageSelect.bind(this);
    this.handleImageUpdate = this.handleImageUpdate.bind(this);
    this.resetImage = this.resetImage.bind(this);

    this.state = {
      profile: {
        name: props.business.name,
        phone: props.business.phone,
        avg_customer_spent: [props.business.avg_customer_spent].join(''),
        avg_party_size: [props.business.avg_party_size].join('')
      },
      location: Object.assign({}, props.business.location),
      image: {
        preview: props.business.image,
      }
    }
    this.state.originalProfile = Object.assign({}, this.state.profile);
    this.state.originalLocation = Object.assign({}, this.state.location);
    this.state.originalImage = Object.assign({}, this.state.image);
  }

  handleProfileUpdate(e) {
    e.preventDefault();

    let formData = this.state.profile;
    formData.location = this.state.location;

    this.props.onUpdateBusiness(formData);
  }

  resetProfile(e) {
    e.preventDefault();

    this.setState({
      profile: Object.assign({}, this.state.originalProfile),
      location: Object.assign({}, this.state.originalLocation)
    });
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

    let formData = new FormData();
    formData.append('image', this.state.image);

    this.props.onUpdateBusinessImage(formData);
  }

  resetImage(e) {
    e.preventDefault();

    this.setState({
      image: Object.assign({}, this.state.originalImage)
    });
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
          <h2 className="card--header">
            Business Image
          </h2>
          <div className="card--content">
            <form className="form-grid" ref="imageForm" onSubmit={this.handleImageUpdate}>
              <label className="span2">
                Select Image
                <Dropzone onDrop={this.handleImageSelect}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
              </label>
              <label className="span2">
                Preview
                <img className="span4" src={this.state.image.preview} />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;