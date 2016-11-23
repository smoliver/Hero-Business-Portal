import React from 'react';
import ReactDOM from 'react-dom';
import Validation from 'react-validation';
import auth from '../../../auth';
import Icon from '../../Icon';

let { Form, Input, Button } = Validation.components;

class RewardForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        let state = {
            method: 'POST',
            url: `${process.env.API_DOMAIN}/rewards/`
        }
        if (props.id) {
            state = {
                method: 'PUT',
                url: `${state.url}${props.id}/`
            }
        }

        // Convert props to state
        state.reward = {
            name: [props.name].join(''),
            points: [props.points].join(''),
            cost_of_goods: [props.cost_of_goods].join(''),
            business: auth.getBusinessId()
        }

        this.state = state;
        this.submit = this.submit.bind(this);
    }

    handleSubmit(e) {
        if (e) e.preventDefault();

        let formData = this.state.reward;
        formData.cost_of_goods = Math.round(parseFloat(formData.cost_of_goods) * 100);
        
        let rewardData = formData;
        rewardData.id = this.props.id;
        rewardData.editing = false;
        rewardData.updating = true;
        rewardData.active = true;

        console.log('rewardData');
        console.log(rewardData);

        let idx = this.props.onUpdating(rewardData);
        formData = JSON.stringify(formData);

        let that = this;
        fetch(this.state.url, {
            method: this.state.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${auth.getToken()}`
            },
            body: formData
        }).then(response => response.json())
        .then(function(reward) {
            console.log('returned reward');
            console.log(reward);
            that.props.onUpdated(idx);
        }).catch(function(err) {
            console.log(err);
        });
    }

    onValueChange(attr, event) {
        let reward = this.state.reward;
        reward[attr] = event.target.value;
        this.setState({
            reward
        });
    }

    submit() {
        this.handleSubmit();
    }

    render() {
        let className = this.props.className;
        className = className ? className + ' rewards-form' : 'rewards-form';
        return (
            <Form className={this.props.className + ' rewards-form'} ref='rewardForm' onSubmit={this.handleSubmit.bind(this)}>
                <div className="rewards-form--inputs">
                    <Input className="rewards-form--name" errorClassName="failure" type='text' onChange={this.onValueChange.bind(this, 'name')} value={this.state.reward.name} name='name' validations={['required']} placeholder="Reward Name"/>
                    <div className="rewards-form--row">
                        <Input containerClassName="rewards-form--price" type='text' onChange={this.onValueChange.bind(this, 'cost_of_goods')} value={this.state.reward.cost_of_goods} name='cost_of_goods' placeholder='Cost of Goods' validations={['required', 'decimal']}/>
                        <Icon symbol={Icon.SYMBOLS.DOLLAR} className="rewards-form--price-icon"/>
                        <Input containerClassName="rewards-form--points" type='text' onChange={this.onValueChange.bind(this, 'points')} value={this.state.reward.points} name='points' placeholder='Points' validations={['required', 'integer']}/>
                        <Icon symbol={Icon.SYMBOLS.REWARD} className="rewards-form--points-icon"/>
                    </div>
                </div>
                <div className="rewards-form-actions">
                    <Icon className="rewards-form-actions--action" symbol={Icon.SYMBOLS.PLUS} onClick={this.submit}/>
                </div>
            </Form>
        )
    }
}

export default RewardForm;