const express = require('express');
const ejs = require('ejs');
const layoutEjs = require('express-ejs-layouts');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
        res.render('home');
    })
    //assets
app.use(express.static('public'));
// set Layout
app.use(layoutEjs);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 33000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})