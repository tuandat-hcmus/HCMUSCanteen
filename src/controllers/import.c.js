const Report = require('../models/import.m');

module.exports = {
    getImports: async (req, res, next) => {
        try {
            
            let data = null;

            data = await Report.getAll();

            res.json({
                data: data
            });
        } catch (error) {
            console.log('Get reports error ', error);
        }
    }
}