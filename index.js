const express = require("express")

const app = express()

app.get("/",(req,res) => {
    res.send("Hello World")
});

app.get("/api/courses/",(req,res) => {
    res.send([1,2,3,4,5])
});

app.get("/api/classes/",(req,res) => {
    res.send(["First","Second","Third"])
});

app.listen(3000,() => { 
    console.log("Listening on port 3000... ")
    console.log("Server Started at http://127.0.0.1:3000/")

});