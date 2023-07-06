class user {
    constructor(email, password, role) {
        this.email = email
        this.password = password
        this.role = role
    }
    set email(email) {
        this._email = email
    }
    set password(password) {
        this._password = password
    }
    set role(role) {
        this._role = role
    }
    get email() {
        return this._email
    }
    get password() {
        return this._password
    }
    get role() {
        return this._role
    }
    getValue() {
        return {
            email: this.email,
            password: this.password,
            role: this.role
        }
    }
}
module.exports = user;