const auth = require("../route.Controller/auth.Controller")
const route = (app) => {
    app.post("/api/login", auth.login)
}

module.exports = route