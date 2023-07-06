const mysql = require("mysql");

class Database {
    constructor(host, user, password, database) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }

    output() {
        return {
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        };
    }
}
let connect = new Database("localhost", "root", "", "education_webteam");
const db = mysql.createConnection(connect.output());
module.exports = db;