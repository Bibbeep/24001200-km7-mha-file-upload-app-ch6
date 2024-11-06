const multer = require("multer");
const { BadRequestError } = require("./error");

module.exports = {
    errorHandler: (err, req, res, next) => {
        if (err instanceof multer.MulterError || err instanceof BadRequestError) {
            return res.status(400).json({
                status: 'Fail',
                message: err.message
            });
        }

        return res.status(500).json({
            status: 'Fail',
            message: 'Internal server error'
        });
    }
};