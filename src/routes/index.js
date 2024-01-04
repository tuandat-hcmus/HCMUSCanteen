const accountRouter = require('./acc.r');
const clientRouter = require('./client.r');
function route(app) {
    app.use('/client', clientRouter);
    app.use('/', accountRouter);
}

module.exports = route;