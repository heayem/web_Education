const db = require("../configure/db.connection")
const { isEmpty } = require("../util/service")
const bcrypt = require('bcrypt')

const getList = (req, res) => {
    db.query("SELECT * FROM course", (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            res.json({
                data: row
            })
        }
    })
}

const getListByOne = (req, res) => {
    const id = req.params.id
    let message = {}
    if (isEmpty(id)) {
        message.id = "require id "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    db.query("SELECT * FROM course WHERE Id=?", [id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        }
        else {
            res.json({
                data: row
            })
        }
    })
}

const create = (req, res) => {

    var {
        // User_Id,
        Name,
        Gender,
        Email,
        Password,
        Role
    } = req.body
    let message = {}
    if (isEmpty(Name)) {
        message.Name = "please fil in Name "
    }
    if (isEmpty(Gender)) {
        message.Gender = "please fil in Gender "
    }

    if (isEmpty(Email)) {
        message.Email = "please fil in Email "
    }

    if (isEmpty(Password)) {
        message.Password = "please fil in Password "
    }

    if (isEmpty(Role)) {
        message.Role = "please fil in Role "
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    db.query("SELECT COUNT(Email) FROM user WHERE Email=?", [Email], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (row.length > 0) {
                res.json({
                    error: true,
                    message: "USer already exist"
                })
            } else {

                Password = bcrypt.hashSync(Password, 10)
                var sql = "INSERT INTO user (Name,Gender,Email,Password,Role) VALUE(?,?,?,?,?)"
                var parameter = [Name, Gender, Email, Password, Role]
                db.query(sql, parameter, (err1, row) => {
                    if (err1) {
                        res.json({
                            error: true,
                            message: err1
                        })
                    }
                    else {
                        if (row.affectedRows > 0) {
                            res.json({
                                message: "Insert success "
                            })
                        } else {

                            res.json({
                                error: true,
                                message: "Please check "
                            })
                        }


                    }
                })
            }
        }
    })

}

const update = (req, res) => {

    var {
        User_Id,
        Name,
        Gender,
        Email,
        Password,
        Role,
        Status
    } = req.body
    let message = {}
    if (isEmpty(User_Id)) {
        message.User_Id = "id is require "
    }
    if (isEmpty(Name)) {
        message.Name = "please fil in Name "
    }
    if (isEmpty(Gender)) {
        message.Gender = "please fil in Gender "
    }

    if (isEmpty(Email)) {
        message.Email = "please fil in Email "
    }

    if (isEmpty(Password)) {
        message.Password = "please fil in Password "
    }

    if (isEmpty(Role)) {
        message.Role = "please fil in Role "
    }
    if (isEmpty(Status)) {
        message.Status = "please fil in Status "
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    var sql = "UPDATE user SET Name=?,Gender=?,Email=?,Role=?,Status=? WHERE User_Id=?"
    var parameter = [Name, Gender, Email, Password, Role, Status, User_Id]
    db.query("SELECT COUNT(Email) FROM user WHERE Email=?", [Email], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (row.length > 0) {
                res.json({
                    error: true,
                    message: "Dapicate Email"
                })
            } else {
                db.query(sql, parameter, (err1, row) => {
                    if (err1) {
                        res.json({
                            error: true,
                            message: err1
                        })
                    }
                    else {
                        if (row.affectedRows > 0) {
                            res.json({
                                message: "Update success "
                            })
                        } else {

                            res.json({
                                error: true,
                                message: "Please check "
                            })
                        }


                    }
                })
            }
        }
    })

}


const Delete = (req, res) => {
    const id = req.params.id
    let message = {}
    if (isEmpty(id)) {
        message.id = "require id "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    db.query("DELETE FROM course WHERE Id=?", [id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        }
        else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "Delete success "
                })
            } else {

                res.json({
                    error: true,
                    message: "id not found"
                })
            }


        }
    })

}

module.exports = {
    getList,
    getListByOne,
    Delete,
    create,
    update
}