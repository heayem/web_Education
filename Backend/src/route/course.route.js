const course = require("../route.Controller/course.Controller")
const { validateToken } = require("../route.Controller/auth.Controller")
const route = (app) => {
    app.get("/api/course", course.getList)
    app.get("/api/course/:id", course.getListByOne)
    app.delete("/api/course/:id", validateToken, course.Delete)
    app.post("/api/course", validateToken, course.create)
    app.put("/api/course", validateToken, course.update)
}

module.exports = route