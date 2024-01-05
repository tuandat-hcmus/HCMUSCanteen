const Product = require('../models/product.m');

module.exports = {
    Add: async (req, res, next) => {
        try {
            const MaSP = req.body.MaSP;
            const Ten = req.body.Ten;
            const DonGia = req.body.DonGia;
            const SoLuongTon = req.body.SoLuongTon;
            const Anh = req.body.Anh;
            const MaLoai = req.body.MaLoai;

            await Product.insert(MaSP, Ten, DonGia, SoLuongTon, Anh, MaLoai);

            res.redirect('/');
        } catch (error) {
            next(error);
        }
    },

    getPage: async (req, res, next) => {
        try {
            const type = req.query.type || 'Tất cả';
            const orderBy = req.query.orderBy || null;
            const isDesc = req.query.isDesc || null;
            let data = null;
            if (type === 'Tất cả') {
                data = await Product.getAll(orderBy, isDesc);
            } else {
                data = await Product.getBy(type, orderBy, isDesc);
            }
            const total = data.length;

            const currentPage = req.query.page || 1;
            const itemsPerPage = 1;
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            data = data.slice(startIndex, endIndex);

            res.json({
                data: data,
                perpage: itemsPerPage,
                total: total,
                type: type
            });
        } catch (error) {
            console.log('Product page error: ', error);
        }
    },

    getType: async (req, res) => {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }
        try {
            let name = '';
            if (req.user) {
                if (req.user.HoTen) name = req.user.HoTen;
                if (req.user.displayName) name = req.user.displayName;
            }
            const data = await Product.getType();
            res.render('home', {
                title: 'Home Page',
                type: data,
                isHome: true,
                isUser: true,
                name: name
            });
        }
        catch (err) {
            console.log('Get type err: ', err);
        }
    }
}