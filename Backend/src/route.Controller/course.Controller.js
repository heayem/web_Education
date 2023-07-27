const db = require("../configure/db.connection")
const { isEmpty } = require("../util/service")
const { checkPermission } = require("./auth.Controller")
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


const create = async (req, res) => {

    var {
        name,
        cate_id,
        price,
        discount,
        order_num,
        description,
    } = req.body

    let message = {}
    if (isEmpty(name)) {
        message.name = "please fil in name "
    }
    if (isEmpty(cate_id)) {
        message.cate_id = "please fil in cate_id "
    }

    if (isEmpty(price)) {
        message.price = "please fil in price "
    }
    if (isEmpty(order_num)) {
        message.order_num = "please fil in order_num "
    }
    if (isEmpty(description)) {
        message.description = "please fil in description "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    if (checkPermission(req, 1)) {
        var sql = "INSERT INTO course (name,cate_id,price,discount,order_num,description) VALUE(?,?,?,?,?,?)"
        var parameter = [name, cate_id, price, discount, order_num, description]
        await db.query(sql, parameter, (err1, row) => {
            if (err1) {
                res.json({
                    error: true,
                    message: err1
                })
            } else {
                res.json({
                    error: false,
                    message: "Insert Sucess!"
                })
            }
        })
    } else {
        res.sendStatus(401)
    }

}

const update = async (req, res) => {

    var {
        Id,
        name,
        cate_id,
        price,
        discount,
        order_num,
        description,
        Status
    } = req.body

    let message = {}
    if (isEmpty(Id)) {
        message.Id = "please fil in Id "
    }
    if (isEmpty(name)) {
        message.name = "please fil in name "
    }
    if (isEmpty(cate_id)) {
        message.cate_id = "please fil in cate_id "
    }
    if (isEmpty(price)) {
        message.price = "please fil in price "
    }
    if (isEmpty(order_num)) {
        message.order_num = "please fil in order_num "
    }
    if (isEmpty(description)) {
        message.description = "please fil in description "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    if (checkPermission(req, 1)) {
        var sql = "UPDATE course SET name=IFNULL(?,name), cate_id=IFNULL(?,cate_id), price=IFNULL(?,price), discount=IFNULL(?,discount),order_num=IFNULL(?,order_num),create_at=?,description=IFNULL(?,description),Status=IFNULL(?,Status) WHERE Id=?"
        var parameter = [name, cate_id, price, discount, order_num, new Date(), description, Status, Id]
        await db.query("SELECT COUNT(name) as name FROM user WHERE name=?", [name], (err, row) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                if (row[0].length > 0) {
                    console.log(row)
                    res.json({
                        error: true,
                        message: "Dapicate name"
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
        res.sendStatus(401)
    }

}


const Delete = async (req, res) => {
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
    if (checkPermission(req, 1)) {
        await db.query("DELETE FROM course WHERE Id=?", [id], (err, row) => {
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
    } else {
        res.sendStatus(401)
    }

}

module.exports = {
    getList,
    getListByOne,
    Delete,
    create,
    update
}