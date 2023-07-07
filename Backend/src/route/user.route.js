const userController = require("../route.Controller/user.Controller")
const auth = require("../route.Controller/auth.Controller")
const { validateToken } = require("../route.Controller/auth.Controller")
const route = (app) => {
    app.get("/api/user", validateToken, userController.getList)
    app.get("/api/user/:id", validateToken, userController.getListByOne)
    app.delete("/api/user/:id", validateToken, userController.Delete)
    app.post("/api/user", validateToken, userController.create)
    app.put("/api/user", validateToken, userController.update)
}

module.exports = route