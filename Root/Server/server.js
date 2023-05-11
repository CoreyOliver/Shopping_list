//init

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require('morgan')
const connectDB = require('./config/database')
//init routes
const mainRoutes = require('./routes/main.routes')

//config
require('dotenv').config({path: './config/.env'})

//passport config
//add passport init here
//require('./config/passport')(passport)
//app.use(passport.initialize())
//app.use(passport.session())

//db connection
connectDB()

app.use(cors())
// app.set('view engine', 'ejs')
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
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
)


//define routes

app.use('/', mainRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})