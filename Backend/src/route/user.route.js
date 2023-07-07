const userController = require("../route.Controller/user.Controller")
const auth = require("../route.Controller/auth.Controller")
const { validateToken } = require("../route.Controller/auth.Controller")
const route = (app) => {
    app.get("/api/user", validateToken, userController.getList)
    app.get("/api/user/:id", validateToken, userController.getListByOne)
    app.delete("/user/:id", userController.Delete)
    app.post("/user", userController.create)
    app.put("/user", userController.update)
}

module.exports = route