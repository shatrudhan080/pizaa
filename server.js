require('dotenv').config()
const express = require('express');
const ejs = require('ejs');
const layoutEjs = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')

const app = express();
// database connection
const url = 'mongodb://localhost:27017/pizza';
mongoose.connect(url, {});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database Connected..');
})

//session Store
const mongoStore = new MongoDbStore({
        mongooseConnection: connection,
        collection: 'sessions'
    })
    // session config
app.use(session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        store: mongoStore,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    }))
    // passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
    // flash notyfication
app.use(flash())
    //assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
    //global middleware
app.use((req, res, next) => {
        res.locals.session = req.session
        res.locals.user = req.user
        next()
    })
    // set Layout
app.use(layoutEjs);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');
//Routes
require('./routes/web')(app)
const PORT = process.env.PORT || 33000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})