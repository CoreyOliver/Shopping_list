//init

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
const connectDB = require('./config/database')  

//config
require('dotenv').config({path: './config/.env'})

//passport config
//add passport init here
//require('./config/passport')(passport)
//app.use(passport.initialize())
//app.use(passport.session())

//db connection
connectDB()


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//need to update mongostore to spec
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)


//define routes

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})