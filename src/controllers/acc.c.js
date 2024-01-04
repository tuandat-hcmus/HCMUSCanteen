const User = require('../model/user.m');
const bcrypt = require('bcrypt');
const saltBounds = 10;

module.exports = {
    Add: async (req, res, next) => {
        try {
            const Fullname = req.body.fullanme;
            const Phone = req.body.phone;
            const Birth = req.body.birth;
            const Gender = req.body.gender;
            const Username = req.body.username;
            const Password = req.body.password;
            const HashPW = await bcrypt.hash(Password, saltBounds);
            // Mặc định là khách hàng 
            await User.insert(new User(Fullname, Phone, Birth, Gender, Username, HashPW, '0', '1', '0', '', ''));
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }
}