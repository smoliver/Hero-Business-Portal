
// Adapted from https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/auth.js
let storage = {
    store(details) {
        localStorage.token = details.key;
        localStorage.businessId = details.user.businesses[0].id;
        localStorage.business = details.user.businesses[0];
    },
    clear() {
        delete localStorage.token;
        delete localStorage.businessId;
        delete localStorage.business;
    }
}

export default {
    login(email, password, cb) {
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            return;
        }
        if (email && password) {
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
                .then(response => response.json())
                .then(details => {
                    storage.store(details);
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
        storage.clear();
        if (cb) cb(false);
        this.onChange(false);
    },

    loggedIn() {
        return !!localStorage.token;
    },

    onChange() {}
}