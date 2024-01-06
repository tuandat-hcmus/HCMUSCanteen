const accountRouter = require('./acc.r');
const clientRouter = require('./client.r');
const orderRouter = require('./orders.r');
const cashierRouter = require('./cashier.r');

function route(app) {
    app.use('/', accountRouter);
    app.use('/client', clientRouter);
    app.use('/client', orderRouter);
    app.use('/cashier', cashierRouter);
}

module.exports = route;