const accountRouter = require('./acc.r');
const clientRouter = require('./client.r');
const cashierRouter = require('./cashier.r');
const adminRouter = require('./admin.r');
const productRouter = require('./product.r');
function route(app) {
    app.use('/cashier', cashierRouter);
    app.use('/client', clientRouter);
    app.use('/admin', adminRouter);
    app.use('/product', productRouter);
    app.use('/', accountRouter);
}

module.exports = route;