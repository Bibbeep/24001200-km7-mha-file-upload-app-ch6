const Picture = require('../models/pictureModel');
const PictureValidation = require('../validations/pictureValidation');

module.exports = {
    create: async (req, res, next) => {
        try {
            PictureValidation.validate(req.body);
            const url = await Picture.upload(req.file);
            const { id, title } = await Picture.create(req.body, url);
            
            return res.status(201).json({
                status: 'Created',
                message: 'Successfully uploaded picture',
                data: {
                    id,
                    title,
                    url
                }
            });
        } catch (err) {
            next(err);
        }
    }
};