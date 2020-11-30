const express = require("express")

const app = express()

const courses = [
    {courseId : 1, name : "Python"},
    {courseId : 2, name : "JavaScript"},
    {courseId : 3, name : "Java"},
    {courseId : 4, name : "Spring"},
    {courseId : 5, name : "MySQl"},
]

app.get("/",(req,res) => {
    res.send("Hello World")
});

app.get("/api/courses/",(req,res) => {
    res.send(courses)
});

app.get("/api/course/:courseId/",(req,res) => {

    let course = courses.find(c => c.courseId === parseInt(req.params.courseId))
    if(!course) res.status(404).send("The course with given id doesn't exists.")
    res.send(course)
    
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