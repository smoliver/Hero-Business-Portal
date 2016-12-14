import React from 'react';
import Routes from './routes';
import auth from './auth'

class BusinessLogic extends React.Component {
  constructor() {
    super();

    this.state = {
      auth: auth.getStatus(),
      business: null,
      request: {
        open: false,
        errors: {}
      }
    };

    this.initializeBusiness = this.initializeBusiness.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.updateBusiness = this.updateBusiness.bind(this);
    this.updateBusinessImage = this.updateBusinessImage.bind(this);
  }

  initializeBusiness(business) {
    // If the average customer spent is not defined
    // Sets it to a default value of $20.00
    // updates the value on the server
    if (business['avg_customer_spent'] == undefined){
        business['avg_customer_spent'] = 20
    } 

    // If the average party size is not defined
    // Sets it to a default value of 1
    // Updates the value on the server
    if (business['avg_party_size'] == undefined) {
        business['avg_party_size'] = 1;
    }

    return business;
  }

  updateBusiness(newBusiness) {
    if (newBusiness.avg_customer_spent) newBusiness.avg_customer_spent = Math.round(newBusiness.avg_customer_spent * 100);

    let url = `${process.env.API_DOMAIN}/business/${this.state.auth.businessId}/`,
      ok;
    this.setState({
      request: {
        open: true,
        errors: {}
      }
    });
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.auth.token}`
      },
      body: JSON.stringify(newBusiness)
    }).then(response => {
      ok = response.ok;
      return response.json();
    }).then(values => {
      if (!ok) {
        throw values;
      }
      return values;
    }).then(business => {
      this.setState({
        business,
        request: {
          open: false,
          errors: {}
        }
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        request: {
          open: false,
          errors: err,
          target: 'update-business'
        }
      });
    });
  }

  updateBusinessImage(imageForm) {
    let url = `${process.env.API_DOMAIN}/business/upload/business-image/${this.state.auth.businessId}/`,
      ok;
    this.setState({
      request: {
        open: true,
        errors: {}
      }
    });
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.state.auth.token}`
      },
      body: imageForm
    }).then(response => {
      ok = response.ok;
      return response.json();
    }).then(values => {
      if (!ok) {
        throw values;
      }
      return values;
    }).then(business => {
      this.setState({
        business,
        request: {
          open: false,
          errors: {}
        }
      })
    }).catch(err => {
      console.log(err);
      this.setState({
        request: {
          open: false,
          errors: err,
          target: 'update-business-image'
        }
      })
    });
  }

  handleLogin(token, businessId) {
    this.setState({
      auth: {
        loggedIn: true,
        token,
        businessId
      }
    });
    fetch(`${process.env.API_DOMAIN}/business/${this.state.auth.businessId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.state.auth.token}`
      }
    }).then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error ("response not ok");
    })
    .then(business => {
      if(business['avg_customer_spent'] == undefined || business['avg_party_size'] == undefined){
        business = this.initializeBusiness(business);
        this.updateBusiness(business);
      }
      else {
        this.setState({
          'business': business
        })
      }
    }).catch(function(err){
      console.log(err);
    })
  }

  componentDidMount() {
    this.handleLogin(this.state.auth.token, this.state.auth.businessId);
  }

  render(){
    return (
      <Routes
        business={this.state.business}
        onUpdateBusiness={this.updateBusiness}
        onUpdateBusinessImage={this.updateBusinessImage}
        onLogin={this.handleLogin}
        request={this.state.request} />
    );
  }
}

export default BusinessLogic;