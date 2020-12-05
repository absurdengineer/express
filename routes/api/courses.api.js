const customDebugger = require('debug')('app:custom')  // pass the namespace you want to create debugger
const express = require('express')
const Joi = require('joi')

const router = express.Router()

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
    customDebugger(course)
    // For debugging store an env variable DEBUG with value of the namespace
    // i.e., DEBUG=app:custom  or for multiple debugger we can create them and set env as
    // DEBUG=app:custom,app:db 
    // We can also debug our code without setting env variable by running our code as
    // $DEBUG=app:custom nodemon index.js
    return schema.validate(course)
}

router.get("/",(req,res) => {
    res.send(courses)
});

router.get("/:courseId/",(req,res) => {

    let course = courses.find(c => c.courseId === parseInt(req.params.courseId))

    if(!course) return res.status(404).send("The course with given id doesn't exists.")
    res.send(course)

});

router.post("/",(req,res) => {

    const {error} = validateCourse(req.body)

    if(error) return res.status(400).send(error.message)

    const course = {
        courseId : courses.length + 1,
        name : req.body.name
    }

    courses.push(course)
    res.status(200).send(course)

});

router.put("/:courseId",(req,res) => {

    let course = courses.find(c => c.courseId === parseInt(req.params.courseId))
    if(!course) return res.status(404).send("The course with given id doesn't exists.")

    const {error} = validateCourse(req.body)
    
    if(error) return res.status(400).send(error.message)

    course.name = req.body.name
    res.status(200).send(course)

});

router.delete("/:courseId",(req,res) => {
 
    let course = courses.find(c => c.courseId === parseInt(req.params.courseId))
    if(!course) return res.status(404).send("The course with given id doesn't exists.")
  
    courses.splice(course.courseId - 1, 1)
    res.status(200).send(course)

});

module.exports = router