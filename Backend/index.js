const express = require('express')
const app = express()
const port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cors({ origin: "*" }))


require("./src/route/user.route")(app)
require("./src/route/auth.route")(app)
require("./src/route/category.route")(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})