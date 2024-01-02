const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');
//---
const cookieParser = require('cookie-parser');
const session = require('express-session');
const accountRouter = require('./router/acc.r');

app.engine('.hbs', hbs.engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'));

// set static files
app.use(express.static('public'));

//---
const secrect = 'mysecrectkey';
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secrect));
app.use(session({
    secret: secrect,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
require('./mws/passport')(app);
app.use(accountRouter);

app.get('/home', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        text: 'Hello World',
        oke: false,
        arr: [1, 2, 3, 4, 5]
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