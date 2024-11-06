module.exports = {
    errorHandler: (err, req, res, next) => {
        if (err.statusCode) {
            return res.status(err.statusCode).json({
                status: 'Fail',
                message: err.message
            });
        }

        return res.status(500).json({
            status: 'Fail',
            message: 'Internal Server Error'
        });
    }
};