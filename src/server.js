const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()

require('dotenv').config({ path: path.join(__dirname, '.env')})

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// settings
app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views'))





// listen
app.listen(process.env.PORT, () => console.log("Server is running on *" + process.env.PORT ))