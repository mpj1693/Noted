var mysql = require("mysql");
require("dotenv").config();

var connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.db_password,
    database: "noted_db"
  })
};

connection.query("SELECT * FROM tables", function(err,tableData){
  if(err)console.log(err);
  console.log(tableData)
})

module.exports = connection;