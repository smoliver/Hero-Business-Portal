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
            return <p className='error'>Required</p>
        }
    },
    email: {
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <p className='error'>{value} isnt an Email.</p>
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
        hint: () => <p className="error">Passwords should be equal.</p>
    },
    min_len_8: {
        rule: value => {
            return value.toString().length >= 8
        },
        hint: () => <p className="error">Must be at least 8 characters long.</p>
    },
    decimal: {
        rule: value => {
            return value ? validator.isDecimal(value) : false
        },
        hint: () => <p className="error">Value must be a decimal number e.g. 1.23</p>
    },
    integer: {
        rule: value => {
            return value ? validator.isInt(value) : false;
        },
        hint: () => <p className="error">Value must be an integer</p>
    }
}

Object.assign(Validation.rules, rules);

export default rules;