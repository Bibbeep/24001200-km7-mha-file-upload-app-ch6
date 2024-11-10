const router = require('express').Router();
const multer = require('../libs/multer');
const PictureController = require('../controllers/pictureController');

router.get('/', (req, res) => {
    return res.status(200).send(
        `<h1>Welcome to Art Gallery API!</h1>
        <a href="/pictures">See all available pictures!</a>
        <a href="https://github.com/Bibbeep/24001200-km7-mha-file-upload-app-ch6">Github Repository</a>`
    );
});
router.post('/pictures', multer.image.single('image'), PictureController.create);
router.get('/pictures', PictureController.getAll);
router.get('/pictures/:id', PictureController.getById);
router.delete('/pictures/:id', PictureController.deleteById);
router.patch('/pictures/:id', multer.image.single('image'), PictureController.editById);

module.exports = router;