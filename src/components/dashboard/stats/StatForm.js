import React from 'react';
import Validation from 'react-validation';

let { Form, Input, Button } = Validation.components;

class StatForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };  
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit() {
        this.props.onSubmit();
    }

    render() {
        let className = this.props.className || "";
        return (
            <Form className={`${className} stat-form`} ref='statForm' onSubmit={this.handleSubmit}>
                <Input containerClassName="stat-form--value" 
                    type="text" 
                    onChange={this.props.onValueChange} 
                    value={this.props.value.toString()} 
                    name='value' 
                    validations={['required', 'integer']}/>
                <h6 className="stat-form--title">{this.props.name}</h6>
            </Form>
        );
    }
}

export default StatForm;