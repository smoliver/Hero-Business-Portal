import React from 'react';
import Validation from 'react-validation';

import Stat from './Stat';
import StatForm from './StatForm';
import Icon from '../../Icon'
import auth from '../../../auth';

let { Form, Button } = Validation.components;

const ZENDESK_ARTICLE = "https://heroapp.zendesk.com/hc/en-us/sections/207248267-FAQ-for-Businesses-";

class StatsContainer extends React.Component {
    constructor(props) {
        super(props);

        let dollarsSpent;
        if (props.business) dollarsSpent = props.business.avg_customer_spent / 100;

        this.updateAvgSpend = this.updateAvgSpend.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.fetchRewardsRedeemed = this.fetchRewardsRedeemed.bind(this);
        this.renderBenefits = this.renderBenefits.bind(this);
        this.renderRewardsRedeemed = this.renderRewardsRedeemed.bind(this);
        this.renderAvgSpend = this.renderAvgSpend.bind(this);
        this.state = {
            rewardsRedeemed: null,
            editing: false,
            avg_customer_spent: dollarsSpent,
            avg_customer_spent_input: dollarsSpent
        }
    }

    updateAvgSpend(spend){
        if (spend){
            this.setState({
                avg_customer_spent: spend
            }); 
            let newBusiness = {};
            newBusiness['id'] = this.props.business.id;
            newBusiness['avg_customer_spent'] = spend;
            this.props.onUpdateBusiness(newBusiness);
        }
    }

    cancelEditing(attr, val){
        this.setState({
            [attr]: val
        })
        this.toggleEditing();
    }

    toggleEditing() {
        this.setState({
            editing: !this.state.editing
        })
    }

    handleAvgSpendSubmit(e) {
        if (e) e.preventDefault();
        this.updateAvgSpend(this.state['avg_customer_spent_input']);
        this.toggleEditing();
    }

    fetchRewardsRedeemed() {
        if (this.props.business) {
            fetch(`${process.env.API_DOMAIN}/business/transactions/${this.props.business.id}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${auth.getToken()}`
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error ("Rewards Redeemed endpoint returned an error")
            }).then(results => {
                this.setState({
                    rewardsRedeemed: results.count
                });
            }).catch(function(err){
                console.log(err);
            })
        }
    }

    onValueChange(attr, event) {
        this.setState({
            [attr]: event.target.value
        }); 
    }

    renderAvgSpend(editing) {
        if(this.props.business && (this.state['avg_customer_spent'] || editing)){
            let StatsCard = editing ? Form : (props) => (<div {...props}>{props.children}</div>);
            // if editing add form submit props to the container
            let cardProps = editing ? {
                ref: 'statForm',
                onSubmit: this.handleAvgSpendSubmit.bind(this)
            } : {};
            let Display = editing ? StatForm : Stat ;
            let helpContent = (
                <div>
                    <h4>Average Customer Spend</h4>
                    <p>The average spend of a customer during a visit to your establishment.  We set it to a default of $20 but we suggest you update it in the dashboard.</p>
                    <p><a href={ZENDESK_ARTICLE}>Check out our FAQ for more information</a></p>
                </div>
            )

            let actions;
            if (editing) {
                actions = (
                    <div className="stats-card--actions">
                        <Button className="stats-card--action">
                            <Icon 
                                symbol={Icon.SYMBOLS.CHECK} 
                                key={1}
                            />
                        </Button>
                        <Icon 
                            symbol={Icon.SYMBOLS.CANCEL} 
                            key={2}
                            onClick={this.cancelEditing.bind(this, 'avg_customer_spent_input', this.state['avg_customer_spent'])} 
                            className="stats-card--action cancel"/>
                    </div>
                )
            }
            else {
                actions =(
                    <div className="stats-card--actions">
                        <Icon 
                            symbol={Icon.SYMBOLS.PENCIL} 
                            key={3}
                            onClick={this.toggleEditing} 
                            className="stats-card--action" />
                        <Icon symbol={Icon.SYMBOLS.HELP}
                            key={4}
                            onClick={() => { this.props.showHelp(helpContent) }}
                            className="stats-card--action" />
                    </div>
                )
            }
            return (
                <StatsCard className="stats-card" key={1} {...cardProps}>
                    <Display name={'Average Customer Spend'} 
                        value={this.state['avg_customer_spent']}
                        symbol='$' 
                        onValueChange={this.onValueChange.bind(this, 'avg_customer_spent_input')}/>
                        {actions}
                </StatsCard>
            );
        }
        return;
    }

    renderRewardsRedeemed() {
        let rewardsRedeemed = this.state.rewardsRedeemed;

        let helpContent = (
            <div>
                <h4>Rewards Redeemed</h4>
                <p>The total number of rewards redeemed by users. Calculated by the app.</p>
                <p><a href={ZENDESK_ARTICLE}>Check out our FAQ for more information</a></p>
            </div>
        )
        
        if(!(rewardsRedeemed == null)){
            return (
                <div className="stats-card" key={2}>
                    <Stat name={'Rewards Redeemed'}
                        value={this.state.rewardsRedeemed} />
                    <div className="stats-card--actions">
                        <Icon symbol={Icon.SYMBOLS.HELP}
                            onClick={() => { this.props.showHelp(helpContent) }}
                            className="stats-card--action" />
                    </div>
                </div>
            )
        }
        return;
    }

    renderBenefits() {
        let rewardsRedeemed = this.state.rewardsRedeemed;
        let customerSpend = this.props.business ? this.state['avg_customer_spent'] || 0 : undefined;
        let partySize = this.props.business ? this.props.business['avg_party_size'] || 0 : undefined;

        let helpContent = (
            <div>
                <h4>Traffic Driven</h4>
                <p>The number of customers brought through the door by the HERO app.  Calculated by the app by tracking your average party size and multiplying that by the number of rewards redeemed.</p>
                <h4>Additional Revenue</h4>
                <p>Estimated profits Hero has brought to your business.  Calculated by the app using its metrics of traffic driven and your estimated customer Average Spend.</p>
                <p><a href={ZENDESK_ARTICLE}>Check out our FAQ for more information</a></p>
            </div>
        )

        if (rewardsRedeemed != undefined && customerSpend != undefined && partySize != undefined) {
            let trafficDriven = partySize * rewardsRedeemed;
            let estimatedProfit = trafficDriven * customerSpend;
            return (
                <div className="stats-card" key={3}>
                    <Stat name={'Estimated Traffic Driven'} value={trafficDriven} />
                    <Icon className="stats-icon" symbol={Icon.SYMBOLS.REWARD} />
                    <Stat name={'Additional Revenues'} symbol='$' value={estimatedProfit} />
                    <div className="stats-card--actions">
                        <Icon symbol={Icon.SYMBOLS.HELP}
                            onClick={() => { this.props.showHelp(helpContent) }}
                            className="stats-card--action" />
                    </div>
                </div>
            )
        }
        return;
    }

    componentDidMount() {
        this.fetchRewardsRedeemed();
        let updateReemedCount = setTimeout(this.fetchRewardsRedeemed, 60000);
        this.setState({
            timer: updateReemedCount
        });
    }

    componentWillUnmount() {
        if(this.state.timer) clearInterval(this.state.timer);
        this.setState({
            timer: null
        });
    }

    render() {
        return (
            <div className="stats">
                <h3 className="stats-header">
                    <Icon symbol={Icon.SYMBOLS.GRAPH} className="stats-header--icon"/>
                    Statistics
                </h3>
                <div className="stats--container">
                    {this.renderAvgSpend(this.state.editing)}
                    {this.renderRewardsRedeemed()}
                    {this.renderBenefits()}
                </div>
            </div>
        );
    }
}

export default StatsContainer;