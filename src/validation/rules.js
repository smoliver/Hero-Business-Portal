import React from 'react';
import phone from 'phone';
import Validation from 'react-validation';
import validator from 'validator';

// Adapted from https://www.npmjs.com/package/react-validation
let rules = {
    required: {
        rule: value => {
            return value.toString().trim();
        },
        hint: value => {
            return <p className="error">Required</p>
        }
    },
    email: {
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <p className="error">{value} isnt an Email.</p>
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
    },
    autocomplete_address: {
        rule: (value, components) => {
            let latitude = components.latitude.state,
                longitude = components.longitude.state;
            return latitude.value && longitude.value;
        },
        hint: () => <p className="error">Must specify a valid address</p>
    },
    phone: {
        rule: value => {
            let formatted = phone(value);
            return formatted.length > 0;
        },
        hint: () => <p className="error">Must submit a valid phone number</p>
    }
}

// Length rules
let lengthRule = (length, phrase, comparator) => {
    return {
        rule: value => {
            return comparator(value.toString().length, length);
        },
        hint: () => <p className="error">{`Must be ${phrase} ${length} characters long.`}</p>
    }
}

let atLeast = (target, base) => target >= base,
    atMost = (target, base) => target <= base;

let lengths = [
    {
        length: 2,
        phrase: 'at least',
        comparator: atLeast,
        ruleName: 'min_len_2'
    },
    {
        length: 8,
        phrase: 'at least',
        comparator: atLeast,
        ruleName: 'min_len_8'
    },
    {
        length: 80,
        phrase: 'at most',
        comparator: atMost,
        ruleName: 'max_len_80'
    }
]

lengths.forEach((length) => {
    rules[length.ruleName] = lengthRule(length.length, length.phrase, length.comparator);
});

Object.assign(Validation.rules, rules);

export default rules;