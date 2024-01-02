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
        title: 'Home Page',
        text: 'Hello World',
        oke: false,
        arr: [1, 2, 3, 4, 5]
    });
});
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login page'
    });
});
app.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Signup page'
    });
});

app.get('/bills', (req, res) => {
    res.render('bills', {
        title: 'Bills'
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});