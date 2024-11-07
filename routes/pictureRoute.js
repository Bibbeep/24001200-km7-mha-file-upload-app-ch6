const router = require('express').Router();
const multer = require('../libs/multer');
const PictureController = require('../controllers/pictureController');

router.post('/pictures', multer.image.single('image'), PictureController.create);
router.get('/pictures', PictureController.getAll);
router.get('/pictures/:id', PictureController.getById);

module.exports = router;