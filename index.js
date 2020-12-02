const express = require("express")
const Joi = require('joi')
const app = express()

const port = process.env.PORT || 3000

const courses = [
    {courseId : 1, name : "Python"},
    {courseId : 2, name : "JavaScript"},
    {courseId : 3, name : "Java"},
    {courseId : 4, name : "Spring"},
    {courseId : 5, name : "MySQl"},
]

const validateCourse = course => {
    const schema = Joi.object({
        name : Joi.string().min(1).required()
    })
 
    return schema.validate(course)
}

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Hello World")
});

app.get("/api/courses/",(req,res) => {
    res.send(courses)
});

app.get("/api/course/:courseId/",(req,res) => {

    let course = courses.find(c => c.courseId === parseInt(req.params.courseId))

    if(!course) return res.status(404).send("The course with given id doesn't exists.")
    res.send(course)

});

app.post("/api/courses/",(req,res) => {

    const {error} = validateCourse(req.body)

    if(error) return res.status(400).send(error.message)

    const course = {
        courseId : courses.length + 1,
        name : req.body.name
    }

    courses.push(course)
    res.status(200).send(course)

});

app.put("/api/course/:courseId",(req,res) => {

    let course = courses.find(c => c.courseId === parseInt(req.params.courseId))
    if(!course) return res.status(404).send("The course with given id doesn't exists.")

    const {error} = validateCourse(req.body)
    
    if(error) return res.status(400).send(error.message)

    course.name = req.body.name
    res.status(200).send(course)

});

app.delete("/api/course/:courseId",(req,res) => {
 
    let course = courses.find(c => c.courseId === parseInt(req.params.courseId))
    if(!course) return res.status(404).send("The course with given id doesn't exists.")
  
    courses.splice(course.courseId - 1, 1)
    res.status(200).send(course)

 });

app.listen(port,() => { 

    console.log(`Listening on port ${port}... `)
    console.log(`Server Started at http://127.0.0.1:${port}/`)

});

