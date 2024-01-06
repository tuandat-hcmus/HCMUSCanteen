const { json } = require('express');
const BillModel = require('../models/bill.m');
const User = require('../models/acc.m');
const BillDetail = require('../models/billdetail.m');
const { as } = require('pg-promise');

module.exports = {
    AddBill: async (req, res, next) => {
        try {
            const data = JSON.parse(req.body.data);
            const payment = req.body.payment;
            const name = req.body.name;
            const sum = req.body.sum;
            const date = new Date()
            await User.getUser2(name, async (user) => {
                const u = await user;
                await BillModel.insert(new BillModel(date, payment, sum, null, u.MaND, "Chưa thanh toán"), async (rs) => {
                    const bill = await rs;
                    data.forEach(async element => {
                        await BillDetail.insert(new BillDetail(bill.MaHD, date, element.MaSP, element.SoLuong, sum));
                    });
                    res.json({user: u, bill: bill});
                });
            });
        }
        catch (e) {
            console.log("AddBill error: ", e);
        }
    },

    LoadPage: async (req, res, next) => {
        await BillModel.getAllBy("NgayLap", true, async (result) => {
            const r = await result;
            const current = new Date();
            const promises = r.map(async element => {
                const user = await User.getUserByID(element.KHMua);
                const time = current - element.NgayLap;
                const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
            
                return { user, time: minutes };
            });
            const customer = await Promise.all(promises);
            res.render("dashboard", {
                title: "Cashier dashboard page",
                isCashier: true,
                isDashboard: true,
                bill: r,
                customer: customer
            });
        });
    },
}