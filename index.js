const customDebugger = require('debug')('app:custom')  // pass the namespace you want to create debugger
const configuration = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require("express")
const Joi = require('joi')
const logger  = require("./logger")
const app = express()

const port = process.env.PORT || 8080

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
customDebugger("Custom Debbugger Enabled...")
// set environment variable using this command `export NODE_ENV=production 

// console.log(process.env.NODE_ENV)   return undefined if not set

// console.group(app.get('env'))       return development if not set

app.use(express.json())  // convert request body into proper JSON format.

app.use(express.urlencoded({extended : true}))  // Deals with Form data such as terget.js?key1=value1&key2=value2

app.use(express.static('public'))  // used to serve static files at root of the project such as http:127.0.0.1:8080/readMe.txt 

app.use(logger)     // logger : user defined middleware

app.use(helmet())   // third party middleware which helps you secure your Express apps by setting various HTTP headers.

app.set('view engine', 'pug')  // specify the template engine
app.set('views','./views')     // specify location for views(optional) by default its ./views

//Configuration
//console.log("App Name : " + configuration.get('name'))
//console.log("Mail Server Name : " + configuration.get('mail.host'))
//console.log("Mail Server Password : " + configuration.get('mail.password'))


if(app.get('env') === "production"){        // only execute in production environment
    console.log("Morgan Enablled...")
    app.use(morgan('tiny'))   // third party middleware which logs all the HTTP requests.
}


app.get("/",(req,res) => {
    objectToTemplate = {
        title : "Homepage",
        message : "Hello Programmer"
    }
    res.render('index.pug',objectToTemplate)
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

