const user = require("../Class_Model/class_Model")
const db = require("../configure/db.connection")
const bcrypt = require("bcrypt")
const { isEmpty } = require("../util/service")



const login = (req, res) => {
    let newUser = new user(req.body.email, req.body.password, "")
    const emailRegex = /^\S+@\S+\.\S+$/
    try {
        if (!emailRegex.test(newUser.email)) {
            throw new Error("Your Email is not correct ");
        }
        if (isEmpty(newUser._password)) {
            throw new Error("Require password ");
        }
        db.query("SELECT * FROM user WHERE Email=?", [newUser._email], (err, row) => {
            if (!err) {
                if (row?.length > 0) {
                    let dataPassword = row[0].Password
                    if (bcrypt.compareSync(newUser._password, dataPassword)) {
                        newUser._role = row[0].Role
                        res.json({
                            message: "login successful",
                            profile: row[0]
                        })
                    } else {
                        res.json({
                            message: "password incorrect",
                        })
                    }

                } else {
                    res.json({
                        message: "You are not yet register",
                    })
                }

            } else {
                res.json({
                    error: true,
                    message: err
                })
            }
        })
    }
    catch (Error) {
        res.json({
            error: true,
            message: Error.message
        });
    }

}

module.exports = { login }