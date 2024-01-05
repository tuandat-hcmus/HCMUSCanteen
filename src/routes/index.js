const accountRouter = require('./acc.r');
const clientRouter = require('./client.r');
const cashierRouter = require('./cashier.r');
function route(app) {
    app.use('/cashier', cashierRouter);
    app.use('/client', clientRouter);
    app.use('/', accountRouter);
}

module.exports = route;