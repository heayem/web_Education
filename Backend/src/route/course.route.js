const course = require("../route.Controller/course.Controller")
const auth = require("../route.Controller/auth.Controller")
const { validateToken } = require("../route.Controller/auth.Controller")
const route = (app) => {
    app.get("/api/course", course.getList)
    app.get("/api/course/:id", course.getListByOne)
    app.delete("/api/course/:id", course.Delete)
    // app.post("/api/user", validateToken, userController.create)
    // app.put("/api/user", validateToken, userController.update)
}

module.exports = route