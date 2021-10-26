const express = require('express');
const ejs = require('ejs');
const layoutEjs = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose')
const session = require('express-session')
const app = express();
// database connection
const url = 'mongodb://localhost:27017/pizza';
mongoose.connect(url, {});
const connection = mongoose.connection;
connection.once('open', () => {
        console.log('Database Connected..');
    })
    // session config


//assets
app.use(express.static('public'));
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