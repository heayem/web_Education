const express = require('express')
const cors = require("cors")
const app = express()
const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: "*" }))


require("./src/route/user.route")(app)
require("./src/route/auth.route")(app)
require("./src/route/role.route")(app)
require("./src/route/category.route")(app)
require("./src/route/course.route")(app)
require("./src/route/video.route")(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})