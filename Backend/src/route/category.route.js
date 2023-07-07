const category = require("../route.Controller/category.Controller")
const { validateToken } = require("../route.Controller/auth.Controller")
const route = (app) => {
    app.get("/api/category", category.getList)
    app.get("/api/category/:id", category.getListByOne)
    app.delete("/api/category/:id", category.Delete)
    app.post("/api/category", validateToken, category.create)
    app.put("/api/category", validateToken, category.update)
}

module.exports = route