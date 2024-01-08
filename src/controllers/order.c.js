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
            const date = new Date();
            await User.getUser2(name, async (user) => {
                const u = await user;
                await BillModel.insert(new BillModel(date, payment, sum, null, u.MaND, "Chưa thanh toán"), async (rs) => {
                    const bill = await rs;
                    data.forEach(async element => {
                        await BillDetail.insert(new BillDetail(bill.MaHD, date, element.MaSP, element.SoLuong, sum));
                    });
                    res.json({ user: u, bill: bill });
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
            res.json({
                bill: r,
                customer: customer.sort(function (a, b) {
                    return a.time - b.time;
                })
            });
        });
    },
    UpdateData: async (req, res) => {
        const id = req.query.id;
        const username = req.user.HoTen;
        await User.getUser2(username, async (rs) => {
            const u = await rs;
            await BillModel.update(["Đã thanh toán", u.MaND], id);
            res.json(true);
        });
    },

    getBillDetail: async (req, res) => {
        const id = req.query.billid;
        const data = await BillDetail.getByID(id);
        console.log(data);
        res.send(JSON.stringify(data));
    },
}