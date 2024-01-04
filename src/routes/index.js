const accountRouter = require('./acc.r');
const clientRouter = require('./client.r');

function route(app) {
    app.use('/', accountRouter);
    app.use('/client', clientRouter);
}

module.exports = route;