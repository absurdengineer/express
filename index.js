const customDebugger = require('debug')('app:custom')  // pass the namespace you want to create debugger
//const configuration = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require("express")
//const logger  = require("./middleware/logger")
const courses = require('./routes/api/courses.api')
const home = require('./routes/pages/home.page')

// Creating App
const app = express()

customDebugger("Custom Debbugger Enabled...")

//Configurations
//console.log("App Name : " + configuration.get('name'))
//console.log("Mail Server Name : " + configuration.get('mail.host'))
//console.log("Mail Server Password : " + configuration.get('mail.password'))

// Work Environments
// set environment variable using this command `export NODE_ENV=production 

// console.log(process.env.NODE_ENV)   return undefined if not set
// console.log(app.get('env'))       return development if not set

// Settings
const port = process.env.PORT || 8080
app.set('view engine', 'pug')  // specify the template engine
app.set('views','./views')     // specify location for views(optional) by default its ./views


// Middlewares
app.use(express.json())  // convert request body into proper JSON format.
app.use(express.urlencoded({extended : true}))  // Deals with Form data such as terget.js?key1=value1&key2=value2
app.use(express.static('public'))  // used to serve static files at root of the project such as http:127.0.0.1:8080/readMe.txt 
//app.use(logger)     // logger : user defined middleware
app.use(helmet())   // third party middleware which helps you secure your Express apps by setting various HTTP headers.
//Conditional Middleware
if(app.get('env') === "production"){        // only execute in production environment
    console.log("Morgan Enablled...")
    app.use(morgan('tiny'))   // third party middleware which logs all the HTTP requests.
}

// Routers 
app.use("/", home)          // Pass the Url then the router for handling that specific route
app.use("/api/courses/", courses)

// Listener
app.listen(port,() => { 
    console.log(`Listening on port ${port}... `)
    console.log(`Server Started at http://127.0.0.1:${port}/`)
});

