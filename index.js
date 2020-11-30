const express = require("express")

const app = express()

app.get("/",(req,res) => {
    res.send("Hello World")
});

app.get("/api/courses/",(req,res) => {
    res.send([
        {courseId : 1, name : "Python"},
        {courseId : 2, name : "JavaScript"},
        {courseId : 3, name : "Java"},
        {courseId : 4, name : "Spring"},
        {courseId : 5, name : "MySQl"},
    ])
});

app.get("/api/course/:courseId/",(req,res) => {
    const courseId = req.params.courseId
    if(courseId == 1) res.send({courseId : 1, name : "Python"})
    else if(courseId == 2) res.send({courseId : 2, name : "JavaScript"})
    else if(courseId == 3) res.send({courseId : 3, name : "Java"})
    else if(courseId == 4) res.send({courseId : 4, name : "Spring"})
    else if(courseId == 5) res.send({courseId : 5, name : "MySQl"})
    else res.send("Course Not Found")
});

app.get("/api/posts/:year/:month/",(req,res) => {
    res.send(req.query)
});

app.get("/api/classes/",(req,res) => {
    res.send(["First","Second","Third"])
});

const port = process.env.PORT || 3000

app.listen(port,() => { 
    console.log(`Listening on port ${port}... `)
    console.log(`Server Started at http://127.0.0.1:${port}/`)

});