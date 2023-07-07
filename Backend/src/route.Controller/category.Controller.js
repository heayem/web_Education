const db = require("../configure/db.connection")
const { isEmpty } = require("../util/service")
const { checkPermission } = require("./auth.Controller")

const getList = (req, res) => {
    db.query("SELECT * FROM category", (err, row) => {
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
    db.query("SELECT * FROM category WHERE cate_id=?", [id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        }
        else {
            if (row.length > 0) {
                res.json({
                    data: row
                })
            } else {
                res.json({
                    error: false,
                    message: "You don't have record yet"
                })
            }

        }
    })
}

const create = (req, res) => {
    if (checkPermission(req, 1)) {
        var {
            Name,
            Status
        } = req.body
        let message = {}
        if (isEmpty(Name)) {
            message.Name = "please fil in Name "
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
        db.query("SELECT COUNT(name) FROM user WHERE name=?", [Name], (err, row) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                if (row > 0) {
                    res.json({
                        error: true,
                        message: "Caetgory already exist"
                    })
                } else {
                    var sql = "INSERT INTO category (Name,create_at,status) VALUE(?,?,?)"
                    var parameter = [Name, new Date(), Status]
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
    } else {
        res.json({
            error: false,
            message: "You don't has permission access this method!",
        });
    }

}

const update = (req, res) => {

    var {
        cate_id,
        Name,
        Status
    } = req.body
    let message = {}
    if (isEmpty(cate_id)) {
        message.cate_id = "id is require "
    }
    if (isEmpty(Name)) {
        message.Name = "please fil in Name "
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
    var sql = "UPDATE category SET name=?,status=? WHERE cate_id=?"
    var parameter = [Name, Status, cate_id]
    if (checkPermission(req, 1)) {
        db.query("SELECT COUNT(name) AS name FROM category WHERE name=?", [Name], (err, row) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                if (row[0].name > 0) {
                    res.json({
                        error: true,
                        message: "Dapicate Category"
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
    } else {
        res.json({
            error: false,
            message: "You don't has permission access this method!",
        });
    }

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
    db.query("DELETE FROM category WHERE cate_id=?", [id], (err, row) => {
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