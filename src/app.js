const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');

app.engine('.hbs', hbs.engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/home', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});