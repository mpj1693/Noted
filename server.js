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

app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "./html/notes.html"))
});

app.get("/api/notes", function(req, res){
connection.query("SELECT * FROM tables", function(err,noteInfo){
  if(err){
    
    return console.log("19");
  }
  res.json(noteInfo);
});
});

app.get("/api/notes/:selected", function(req, res){
  connection.query("SELECT * FROM tables where id = ?", [req.params.selected], function(err, result){
    if(err) {
      
      return console.log("29");
    }
    res.json(result);
  })
})

app.post("/api/notes", function(req, res){
  connection.query("INSERT INTO tables SET ?", req.body, function(err, createNote){
    if(err){
      
      return console.log("post\n" + err);
    }
    res.json(createNote);
  })
})

app.delete("/api/notes/:selected", function(req, res){
  connection.query("DELETE FROM tables where id = ?", [req.params.selected], function(err, result){
    if(err) {
      
      return console.log("delete");
    }
    res.json(result);
  })
})

app.put("/api/notes/:selected", function(req, res){
  connection.query("UPDATE tables SET title = ?, content = ? WHERE id = ?", [req.body.title, req.body.content, req.params.selected], function(err, result){
    if(err){
      return console.log("Update");
    }
    res.json(result)
  })
})

app.listen(PORT, () => console.log("you are online.") );