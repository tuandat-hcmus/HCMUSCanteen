const db = require('../utils/db');
const tbName = "HoaDon";

module.exports = class Bill {
    constructor(NgayLap, PhuongThucTT, TongHoaDon, NVLap, KHMua, TinhTrang) {
        this.NVLap = NVLap;
        this.NgayLap = NgayLap;
        this.PhuongThucTT = PhuongThucTT;
        this.TongHoaDon = TongHoaDon;
        this.KHMua = KHMua;
        this.TinhTrang = TinhTrang
    }
    static async insert(bill) {
        return db.insertWithoutID(tbName, bill);
    }
    static async getAll() {
        return db.selectAll(tbName);
    }
    static async getAllBy(orderBy, isDesc) {
        return db.selectAllBy(tbName, orderBy, isDesc);
    }
    static async getAllBy(orderBy, isDesc, cb) {
        const res = db.selectAllBy(tbName, orderBy, isDesc);
        cb(res);
        return res;
    }
    static async insert(bill, cb) {
        const res = db.insertWithoutID(tbName, bill);
        cb(res);
        return res;
    }
}