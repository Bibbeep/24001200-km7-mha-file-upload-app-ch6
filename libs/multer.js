const multer = require('multer');
const { BadRequestError } = require('../utils/error');
const MB = 1048576;

module.exports = {
    image: multer({
        limits: {
            fields: 2,
            fileSize: 10 * MB
        },
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
            
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new BadRequestError('File type must be .jpg, .jpeg, .png, .gif, or .svg!'));
            }
        }
    })
};