const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');
//---
const cookieParser = require('cookie-parser');
const session = require('express-session');
const accountRouter = require('./routes/acc.r');

app.engine('.hbs', hbs.engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'));

// set static files
app.use(express.static('public'));

//---
const https = require('https');
const fs = require('fs');
const secrect = 'mysecrectkey';
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secrect));
app.use(session({
    secret: secrect,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
require('./mws/ggpassport')(app);
require('./mws/fbpassport')(app);
require('./mws/passport')(app);

// app.use(accountRouter);
const route = require('./routes');
route(app);

// app.get('/home', (req, res) => {
//     res.render('home', {
//         title: 'Home Page'
//     });
// });

// app.get('/bills', (req, res) => {
//     res.render('bills', {
//         title: 'Bills'
//     })
// })

// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// });

const server = https.createServer({
    key: process.env.key,
    cert: process.env.cert
}, app);

server.listen(port, () => console.log(`Listening on port ${port}`));
