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
app.set('views', path.join(__dirname, 'views'));

// set static files
app.use(express.static('public'));

app.get('/home', (req, res) => {
    res.render('home', {
        title: 'Home Page'
    });
});

app.get('/bills', (req, res) => {
    res.render('bills', {
        title: 'Bills'
    })
})

app.get('/products/detail', (req, res) => {
    res.render('products/detail', {
        title: 'Product'
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

