const userController = require("../route.Controller/user.Controller")
const route = (app) => {
    app.get("/user", userController.getList)
    app.get("/user/:id", userController.getListByOne)
    app.delete("/user/:id", userController.Delete)
    app.post("/user", userController.create)
    app.put("/user", userController.update)
}

module.exports = route