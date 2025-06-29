const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/rolehMiddleware')

router.post('/registration', [check('username', "Заполните поля").notEmpty(), check('username', "Пароль от 4 до 10 символов").isLength({min:4, max:10})], controller.registration);
router.post('/login',controller.login);
//router.get('/users', authMiddleware, controller.getUsers);
router.get('/users', roleMiddleware(['USER','ADMIN']), controller.getUsers);
router.get('/', controller.getMain);

  
module.exports = router