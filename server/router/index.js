const router = require('express').Router()
const PhotoController = require('../controllers/admin')
const UserController = require('../controllers/user')
const upload = require('../middleware/multer')
const {authentication, authorization} = require('../middleware/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/photo', PhotoController.findAll)
router.get('/photo/:id', PhotoController.getById)
router.post('/photo', upload.single('photo_url'), PhotoController.createPhoto)
router.put('/photo/:id', authorization, upload.single('photo_url'),PhotoController.updatePhoto)
router.delete('/photo/:id',authorization, PhotoController.deletePhoto)

module.exports = router