function ChameleoAuth(server) {
    this.server = server;
    this.xmlRequest = new XMLHttpRequest();
    this.xmlRequest.withCredentials = true;
}

/*
* @param {Object} - contains the data of the user
* @param {Function} - cb with response parameter, calls after the request is sent
*/
ChameleoAuth.prototype.register = function(user, cb) {
    this.xmlRequest.onload = function(e) {
        cb({status: this.status, message: JSON.parse(this.responseText).message});
    }
    this.xmlRequest.open("POST", this.server + "/register", true);
    this.xmlRequest.setRequestHeader("Content-Type", "application/json");
    this.xmlRequest.send(JSON.stringify(user));
}

/*
* @param {String} - username, will be the email if there's no column with type: username in the users' model
* @param {String} - password
* @param {Function} - cb with response parameter, calls after the request is sent
*/
ChameleoAuth.prototype.login = function(username, password, cb) {
    this.xmlRequest.onload = function(e) {
        cb({status: this.status, message: JSON.parse(this.responseText).message});
    }
    this.xmlRequest.open("POST", this.server + "/login", true);
    this.xmlRequest.setRequestHeader("Content-Type", "application/json");
    this.xmlRequest.send(JSON.stringify({username: username, password: password}));
}

/*
* @param {Function} - cb with response parameter, calls after the request is sent
*/
ChameleoAuth.prototype.logout = function(cb) {
    this.xmlRequest.onload = function(e) {
        cb({status: this.status, message: JSON.parse(this.responseText).message});
    }
    this.xmlRequest.open("POST", this.server + "/logout", true);
    this.xmlRequest.send(null);
}

/*
* @param {Function} - cb with response parameter, calls after the request is sent
*/
ChameleoAuth.prototype.verifyUser = function(cb) {
    this.xmlRequest.onload = function(e) {
        cb({status: this.status, message: JSON.parse(this.responseText).message});
    }
    this.xmlRequest.open("POST", this.server + "/user/logged-in", true);
    this.xmlRequest.send(null);
}

/*
* @param {String} - password, will be the email if there's no column with type: username in the users' model
* @param {Object} - data to edit the user with
* @param {Function} - cb with response parameter, calls after the request is sent
*/
ChameleoAuth.prototype.setAccountDetails = function(password, newAccountDetails, cb) {
    this.xmlRequest.onload = function(e) {
        cb({status: this.status, message: JSON.parse(this.responseText).message});
    }
    this.xmlRequest.open("PUT", this.server + "/user/edit", true);
    this.xmlRequest.setRequestHeader("Content-Type", "application/json");
    this.xmlRequest.send(JSON.stringify({
        password: password,
        account_details: newAccountDetails,
    }));
}

ChameleoAuth.prototype.setAccountPassword = function(oldPassword, newPassword, cb) {
    this.xmlRequest.onload = function(e) {
        cb({status: this.status, message: JSON.parse(this.responseText).message});
    }
    this.xmlRequest.open("PUT", this.server + "/user/change-password", true);
    this.xmlRequest.setRequestHeader("Content-Type", "application/json");
    this.xmlRequest.send(JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
    }));
}

ChameleoAuth.prototype.deleteUser = function(password, cb) {
    this.xmlRequest.onload = function(e) {
        cb({status: this.status, message: JSON.parse(this.responseText).message});
    }
    this.xmlRequest.open("DELETE", this.server + "/user/delete", true);
    this.xmlRequest.setRequestHeader("Content-Type", "application/json");
    this.xmlRequest.send(JSON.stringify({
        password: password
    }));
}

ChameleoAuth.prototype.verifyUser = function(token, cb) {
    this.xmlRequest.onload = function(e) {
        cb({status: this.status, message: JSON.parse(this.responseText).message});
    }
    this.xmlRequest.open("GET", this.server + "/user/verify/:token" + token, true);
    this.xmlRequest.send();
}