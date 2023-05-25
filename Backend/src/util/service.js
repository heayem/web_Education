const isEmpty = (Obj) => {
    if (Obj == "" || Obj == undefined || Obj == "null" || Obj == null) {
        return true
    }
    return false
}

module.exports = {
    isEmpty
}