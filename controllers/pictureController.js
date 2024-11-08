const Picture = require('../models/pictureModel');
const { BadRequestError } = require('../utils/error');
const PictureValidation = require('../validations/pictureValidation');

module.exports = {
    create: async (req, res, next) => {
        try {
            PictureValidation.validatePost(req.body, req.file);
            const { fileId, url } = await Picture.uploadImgKit(req.file);
            const { id, title } = await Picture.create(req.body, fileId, url);
            
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
    },
    getAll: async (req, res, next) => {
        try {
            const pictures = await Picture.findAll();

            if (pictures.length === 0) {
                return res.status(200).json({
                    status: 'OK',
                    message: 'There is no picture',
                    data: []
                });
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved pictures data',
                data: pictures
            });
        } catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            PictureValidation.validateId(req.params);
            const picture = await Picture.findById(req.params);

            if (!picture) {
                return res.status(404).json({
                    status: 'OK',
                    message: 'Picture not found!'
                });
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved the picture',
                data: picture
            });
        } catch (err) {
            next(err);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            PictureValidation.validateId(req.params);
            const { fileId } = await Picture.deleteById(req.params);

            if (!fileId) {
                throw new BadRequestError('Picture not found!');
            }

            await Picture.deleteImgKit(fileId);

            return res.status(200).json({
                status: 'OK',
                message: 'Picture successfully deleted'
            });
        } catch (err) {
            next(err);
        }
    },
    editById: async (req, res, next) => {
        try {
            PictureValidation.validateId(req.params);
            PictureValidation.validatePatch(req.body, req.file);

            let file = {
                fileId: null,
                url: null
            };

            if (req.file) {
                file = await Picture.uploadImgKit(req.file);
            }

            const picture = await Picture.editById(req.params, req.body, file);

            if (!picture) {
                throw new BadRequestError('Picture not found!');
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Picture successfully edited',
                data: picture
            });
        } catch (err) {
            next(err);
        }
    },
};