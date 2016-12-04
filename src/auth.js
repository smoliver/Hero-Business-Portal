
// Adapted from https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/auth.js

let statusObj = {
    loggedIn: false,
    businessId: null,
    token: null
}

export default {
    storage: {
        store(details) {
            localStorage.token = details.key;
            localStorage.businessId = details.user.businesses[0].id;
        },
        clear() {
            delete localStorage.token;
            delete localStorage.businessId;
        }
    },
    login(email, password, cb) {
        let status = Object.assign({}, statusObj);
        if (localStorage.token) {
            status = {
                loggedIn: true,
                businessId: this.getBusinessId(),
                token: this.getToken()
            }
            if (cb) cb(status);
            this.onChange(status);
            return;
        }
        if (email && password) {
            let ok;
            fetch(`${process.env.API_DOMAIN}/auth/login/business/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                })
                .then(response => {
                    ok = response.ok;
                    return response.json();
                })
                .then(details => {
                    if (!ok) {
                        throw details;
                    }
                    this.storage.store(details);
                    status = {
                        loggedIn: true,
                        businessId: this.getBusinessId(),
                        token: this.getToken()
                    }
                    if (cb) cb(status);
                    this.onChange(status);
                })
                .catch(err => {
                    if (cb) cb(status);
                    this.onChange(status);
                });
        } else {
            if (cb) cb(status);
            this.onChange(status);
        }
    },

    getToken() {
        return localStorage.token;
    },

    getBusinessId() {
        return localStorage.businessId;
    },

    getStatus() {
        let status = {
            token: this.getToken(),
            businessId: this.getBusinessId()
        };
        status.loggedIn = status.businessId != null;
        return status;
    },

    logout(cb) {
        status = Object.assign({}, statusObj);
        this.storage.clear();
        if (cb) cb(status);
        this.onChange(status);
    },

    loggedIn() {
        return !!localStorage.token;
    },

    onChange() {}
}