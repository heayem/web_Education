const user = require("../Class_Model/class_Model")
const db = require("../configure/db.connection")
const bcrypt = require("bcrypt")
const { isEmpty } = require("../util/service")
const jwt = require("jsonwebtoken")
require('dotenv').config()


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
                        // newUser._role = row[0].Role
                        delete row[0]?.Password
                        const user = row[0]
                        const access_token = genarateToken(user)
                        res.json({
                            message: "login successful",
                            profile: row[0],
                            access_token: access_token
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

const genarateToken = (user) => {
    return jwt.sign({ user: user }, process.env.ACCESS_TOKEN)
    // return jwt.sign({ user: user }, process.env.ACCESS_TOKEN, { expiresIn: "10m" })
}

const checkPermission = (req, permission_code) => {
    if (req.user) {
        var role = req.user.Role;
        var isPermission = false;
        if (role == permission_code) {
            isPermission = true;
        }
        return isPermission;
    }
    return false;
}

const validateToken = (req, res, next) => {
    var AuthHeader = req.headers["authorization"]
    if (AuthHeader) {
        AuthHeader = AuthHeader.split(" ");
        var token = AuthHeader[1]
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (!err) {
                req.user = user.user
                next();
            } else {
                res.json({
                    error: true,
                    message: "Invalid token"
                })
            }
        })
    } else {
        res.json({
            error: true,
            message: "Please fill in token"
        })
    }
}

module.exports = { login, checkPermission, validateToken }