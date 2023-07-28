const video = require("../route.Controller/video.Controller")
const upload = require("./upload")
const { validateToken } = require("../route.Controller/auth.Controller")
const route = (app) => {
    app.get("/api/video", validateToken, video.getList)
    app.get("/api/video/:id", validateToken, video.getListByOne)
    // app.delete("/api/user/:id", validateToken, userController.Delete)
    app.post("/api/video", validateToken, upload.upload.single("videos"), video.create)
    // app.put("/api/user", validateToken, userController.update)
}

module.exports = route