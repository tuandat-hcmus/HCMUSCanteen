const db = require('../utils/db');
const tbName = "NhapHang";

module.exports = class Report {
    constructor(MaNH, NgayLap, NguoiNhap) {
        this.MaNH = MaNH;
        this.NgayLap = NgayLap;
        this.NguoiNhap = NguoiNhap;
    }
    static async insert(report) {
        return db.insertWithoutID(tbName, report);
    }
    static async getAll() {
        return db.joinTBAll(tbName, "NguoiDung", "NguoiNhap", "MaND");
    }
    static async getAllBy(orderBy, isDesc) {
        return db.selectAllBy(tbName, orderBy, isDesc);
    }
    static async getAllBy(orderBy, isDesc, cb) {
        const res = db.selectAllBy(tbName, orderBy, isDesc);
        cb(res);
        return res;
    }
    static async insert(report, cb) {
        const res = db.insertWithoutID(tbName, report);
        cb(res);
        return res;
    }
}