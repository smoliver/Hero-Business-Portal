import React from 'react';
import Routes from './routes';
import auth from './auth'

class BusinessLogic extends React.Component {
  constructor() {
    super();

    this.state = {
      business: null
    };

    this.updateBusiness = this.updateBusiness.bind(this);
    this.initializeBusiness = this.initializeBusiness.bind(this);
  }

  initializeBusiness(business){
    // If the average customer spent is not defined
    // Sets it to a default value of $20.00
    // updates the value on the server
    if (business['avg_customer_spent'] == undefined){
        business['avg_customer_spent'] = 2000
    } 

    // If the average party size is not defined
    // Sets it to a default value of 1
    // Updates the value on the server
    if (business['avg_party_size'] == undefined) {
        business['avg_party_size'] = 1;
    }

    return business;
  }

  updateBusiness(newBusiness){
    let oldBusiness = this.state.business;

    let url = `${process.env.API_DOMAIN}/business/${oldBusiness.id}/`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${auth.getToken()}`
      },
      body: JSON.stringify(newBusiness)
    }).then((response) => {
      if (!response.ok) {
        throw 'Error updating profile';
      }
      return response.json();
    }).then((business) => {
      this.setState({
        business
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        business: oldBusiness
      });
    });
  }

  componentDidMount() {
    fetch(`${process.env.API_DOMAIN}/business/${auth.getBusinessId()}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${auth.getToken()}`
      }
    }).then(response => response.json())
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

  render(){
    return (
      <Routes business={this.state.business} onUpdateBusiness={this.updateBusiness} />
    );
  }
}

export default BusinessLogic;