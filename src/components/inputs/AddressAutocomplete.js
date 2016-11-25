import loadGoogleMapsAPI from 'load-google-maps-api';
import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';

let { Input } = Validation.components;

class AddressAutocomplete extends React.Component {
    constructor() {
        super();
        
        this.selectPlace = this.selectPlace.bind(this);
        this.state = {
            autocomplete: null,
            selectedAddress: '',
            address: {
                route: '',
                city: '',
                state: '',
                zipcode: '',
                latitude: '',
                longitude: ''
            }
        }
    }
    
    componentDidMount() {
        let that = this;
        loadGoogleMapsAPI({
            key: 'AIzaSyDJS-hJWkUhxVDSERwL-oV59SsEGPjvdbo',
            libraries: ['places']
        }).then((map) => {
            let autocomplete = new map.places.Autocomplete(ReactDOM.findDOMNode(this.refs.autocomplete).children[0], {types: ['geocode']});
            autocomplete.addListener('place_changed', that.selectPlace);
            that.setState({
                autocomplete
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    selectPlace() {
        let address = this.state.address,
            place = this.state.autocomplete.getPlace(),
            coords = place.geometry.location;
        address.longitude = coords.lat();
        address.latitude = coords.lng();

        place.address_components.forEach((component) => {
            component.types.forEach((type) => {
                switch (type) {
                    case 'street_number':
                        address['route'] = component.short_name;
                        break;

                    case 'route':
                        address['route'] = [address['route'], component.short_name].join(' ');
                        break;

                    case 'locality':
                        address['city'] = component.short_name;
                        break;

                    case 'administrative_area_level_1':
                        address['state'] = component.short_name;
                        break;

                    case 'postal_code':
                        address['zipcode'] = component.short_name;
                        break;
                    
                    case 'postal_code_suffix':
                        address['zipcode'] = [address['zipcode'], component.short_name].join('-');

                    default:
                        break;
                }
            })
        });

        this.setState({
            address,
            selectedAddress: place.formatted_address
        });

        this.props.onPlaceSelect(address);
    }

    render() {
        return (
            <div className={this.props.className}>
                <Input name="autocomplete" value={this.state.selectedAddress} containerClassName="span2" ref="autocomplete" errorClassName="failure" type="text" validations={['required', 'autocomplete_address']} />
                <Input name="latitude" type="hidden" value={this.state.address.latitude} validations={[]} />
                <Input name="longitude" type="hidden" value={this.state.address.longitude} validations={[]} />
            </div>
        )
    }
}

export default AddressAutocomplete;