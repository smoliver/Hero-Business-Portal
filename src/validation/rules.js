import React from 'react';

import Validation from 'react-validation';

import validator from 'validator';

// Adapted from https://www.npmjs.com/package/react-validation
let rules = {
    required: {
        rule: value => {
            return value.toString().trim();
        },
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    email: {
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} isnt an Email.</span>
        }
    },
    password: {
        rule: (value, components) => {
            const password = components.password1.state;
            const passwordConfirm = components.password2.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
    },
    min_len_8: {
        rule: value => {
            return value.toString().length >= 8
        },
        hint: () => <span className="form-error is-visible">Must be at least 8 characters long.</span>
    },
    decimal: {
        rule: value => {
            return validator.isDecimal(value)
        },
        hint: () => <span className="form-error is-visible">Value must be a decimal number e.g. 1.23</span>
    }
}

Object.assign(Validation.rules, rules);

export default rules;