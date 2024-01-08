const db = require('../utils/db');
const tbName = "ChiTietHoaDon";

module.exports = class BillDetail {
    constructor(MaHD, NgayLap, MaSP, SoLuong, TongTien) {
        this.MaHD = MaHD;
        this.NgayLap = NgayLap;
        this.MaSP = MaSP;
        this.SoLuong = SoLuong;
        this.TongTien = TongTien;
    }
    static async insert(billdetail) {
        return db.insertWithoutID(tbName, billdetail);
    }
    static async getAll() {
        return db.selectAll(tbName);
    }
    static async getAllBy(orderBy, isDesc) {
        return db.selectAllBy(tbName, orderBy, isDesc);
    }
    static async getByID(id) {
        return db.selectMany(tbName, "MaHD", id);
    }
}