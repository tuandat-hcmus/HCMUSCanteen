const Product = require('../models/product.m');
const { search } = require('../routes/acc.r');

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
            const searchInput = req.query.search || null;
            let data = null;
            if (searchInput == null) {
                if (type === 'Tất cả') {
                    data = await Product.getAll(orderBy, isDesc);
                } else {
                    data = await Product.getBy(type, orderBy, isDesc);
                }
            } else {
                if (type === 'Tất cả') {
                    data = await Product.getSearch(searchInput);
                } else {
                    data = await Product.getByWithSearch(type, orderBy, isDesc, searchInput);
                }
            }

            const total = data.length;

            const currentPage = req.query.page || 1;
            const itemsPerPage = 2;
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

    getSearch: async (req, res, next) => {
        try {
            const input = req.query.input;
            let data = null;
            data = await Product.getSearch(input);

            const total = data.length;

            const currentPage = req.query.page || 1;
            const itemsPerPage = 2;
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            data = data.slice(startIndex, endIndex);

            res.json({
                data: data,
                perpage: itemsPerPage,
                total: total,
                type: 'Tất cả'
            });
        } catch (error) {
            console.log('Search page error: ', error);
        }
    },

    getType: async (req, res) => {
        if (!req.user) {
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
                username: name
            });
        }
        catch (err) {
            console.log('Get type err: ', err);
        }
    }
}