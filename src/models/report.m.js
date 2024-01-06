const db = require('../utils/db');
const tbName = "DoanhThu";

module.exports = class Report {
    constructor(MaDT, NgayLap, TongDT, MaNV) {
        this.MaDT = MaDT;
        this.NgayLap = NgayLap;
        this.TongDT = TongDT;
        this.MaNV = MaNV;
    }
    static async insert(report) {
        return db.insertWithoutID(tbName, report);
    }
    static async getAll() {
        return db.joinTBAll(tbName, "NguoiDung", "MaNV", "MaND");
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