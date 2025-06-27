
const Role = require('./models/Role');
const User = require('./models/Use');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator')

class authController{

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации", errors})
            }
            const {username, password} = req.body
            console.log({username, password})
/* не получаем из базы юзера*/
            const candidate = await User.findOne({username})
            console.log(candidate);

            if (candidate){
                return res.status(400).json({message:"Пользователь существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await User.findOne({value:'USER'})
            console.log(userRole);
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь зарегестрирован'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Reg error'})
        }
    }
    async login(req, res) {
        try {
            res.json("server work")
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req, res) {
        try {
            /* const userRole = new Role()
            const adminRole = new Role({value: 'ADMIN'})
            await userRole.save()
            await adminRole.save() 
            const userName = new User({username: '', password: '', roles: 'USER'})
            await userName.save()*/
            res.json("server work")
        } catch (e) {
            console.log(e)
        }
    }
    async getMain(req, res) {
        try {
            res.json("Main Page")
        } catch (e) {
            console.log(e)
        }
    }
}
module.exports = new authController();
