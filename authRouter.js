const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")

router.post('/registration', [check('username', "Заполните поля").notEmpty(), check('username', "Пароль от 4 до 10 символов").isLength({min:4, max:10})], controller.registration);
router.post('/login',controller.login);
router.get('/users', controller.getUsers);
router.get('/', controller.getMain);
  
module.exports = router