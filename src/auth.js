
// Adapted from https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/auth.js

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
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
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
                    if (cb) cb(true);
                    this.onChange(true);
                })
                .catch(err => {
                    if (cb) cb(false);
                    this.onChange(false);
                });
        } else {
            if (cb) cb(false);
            this.onChange(false);
        }
    },

    getToken() {
        return localStorage.token;
    },

    getBusinessId() {
        return localStorage.businessId;
    },

    logout(cb) {
        this.storage.clear();
        if (cb) cb(false);
        this.onChange(false);
    },

    loggedIn() {
        return !!localStorage.token;
    },

    onChange() {}
}