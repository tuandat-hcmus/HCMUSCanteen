const db = require('../utils/db');
const tbName = "NguoiDung";

module.exports = class User {
    constructor(HoTen, SDT, NgaySinh, GioiTinh, Username, MatKhau, LaKhachHang, LaAdmin, LaNhanVien, DiaChi, giolam) {
        this.HoTen = HoTen;
        this.SDT = SDT;
        this.NgaySinh = NgaySinh;
        this.GioiTinh = GioiTinh;
        this.Username = Username;
        this.MatKhau = MatKhau;
        this.LaKhachHang = LaKhachHang;
        this.LaAdmin = LaAdmin;
        this.LaNhanVien = LaNhanVien;
        this.DiaChi = DiaChi;
        this.giolam = giolam;
    }
    static async insert(user) {
        return db.insert(tbName, user);
    }
    static async getUser(username) {
        const res = db.select(tbName, "Username", username);
        if (res instanceof User) return res;
        return null;
    }
}