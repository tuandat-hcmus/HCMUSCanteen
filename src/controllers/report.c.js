const Report = require('../models/report.m');

module.exports = {
    getReports: async (req, res, next) => {
        try {
            const fromDate = req.query.from || null;
            const toDate = req.query.to || null;
            
            let data = null;

            if (fromDate === null && toDate === null) {
                data = await Report.getAll();
            }

            res.json({
                data: data
            });
        } catch (error) {
            console.log('Get reports error ', error);
        }
    }
}