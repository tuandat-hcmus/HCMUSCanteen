const { json } = require('express');
const BillModel = require('../models/bill.m');

module.exports = {
    getBill: async () => {
        try {
            let data = await BillModel.getManyBy("TinhTrang", "Đã thanh toán");
            data.concat(await BillModel.getManyBy("TinhTrang", "Hủy"));
            return data;
        }
        catch (e) {
            console.log("Get bill controller error: ", e);
        }
        return null;
    },
}