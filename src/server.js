// --- Requires ---
const cookieParser = require('cookie-parser')
const express = require('express')
const sessions = require('express-session')
const path = require('path')
const app = express()

// --- Dotenv Config ---
require('dotenv').config({ path: path.join(__dirname, '.env')})

const oneDay = 1000 * 60 * 60 * 24;

// --- Middlewares ---
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(sessions({
    secret: "anysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

// --- Settings ---
app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'src', 'views'))


// --- Routes ---
let session;
app.get('/', (req, res) => {
    session = req.session
    if(session.userid){
        res.send("Welcome User <a href='/logout'> click to logout </a>")
    } else {
        res.redirect('/login')
    }
})

app.get('/login', (req, res) => {
    res.render('form')
})

app.post('/login', (req, res) => {
    if(req.body.username && req.body.password){
        session = req.session
        session.userid = req.body.username
        console.log(req.session);
        res.send("Welcome User <a href='/logout'> click to logout </a>")
    } else {
        res.send("Invalida Password or Username")
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

// --- Listen ---
app.listen(process.env.PORT, () => console.log("Server is running on *" + process.env.PORT ))