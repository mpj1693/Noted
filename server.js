const express = require("express");
const connection = require("./db/connection");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "./html/home.html"))
});

app.get("/api/notes", function(req, res){
connection.query("SELECT * FROM tables", function(err,tableData){
  if(err){
    return res.status(500).json(err);
  }
  res.json(tableData);
  console.log(tableData)
});
});

app.listen(PORT, () => console.log("you are online.") );