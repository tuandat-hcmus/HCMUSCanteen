const db = require('../utils/db');
const tbName = "NguoiDung";

module.exports = class User {
    constructor(HoTen, SDT, NgaySinh, GioiTinh, Username, MatKhau, Email, LaKhachHang, LaAdmin, LaNhanVien, DiaChi, giolam) {
        this.HoTen = HoTen;
        this.SDT = SDT;
        this.NgaySinh = NgaySinh;
        this.Email = Email;
        this.GioiTinh = GioiTinh;
        this.UserName = Username;
        this.MatKhau = MatKhau;
        this.LaKhachHang = LaKhachHang;
        this.LaAdmin = LaAdmin;
        this.LaNhanVien = LaNhanVien;
        this.DiaChi = DiaChi;
        this.giolam = giolam;
    }
    static async insert(user) {
        return db.insertWithoutID(tbName, user);
    }
    static async getUser(username) {
        return db.select(tbName, "UserName", username);
    }
    static async getUserByID(id) {
        return db.select(tbName, "MaND", id);
    }
    static async getUser2(username, cb) {
        const res = db.select(tbName, "UserName", username);
        cb(res);
        return res;
    }
}