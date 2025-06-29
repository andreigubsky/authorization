
const Role = require('./models/Role');
const User = require('./models/Use');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const {secret} = require('./config')

const generateAccessToken = (id,roles)=>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(
        payload, 
        secret);
}
class authController{

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            console.log(candidate);

            if (candidate){
                return res.status(400).json({message:"Пользователь существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            console.log(hashPassword);
            const userRole = await Role.findOne({value:'USER'})
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
            const {username, password} = req.body;
            const user = await User.findOne({username});
            
            if (!user){
                return res.status(400).json({message:`Пользователь ${username} не существует`})
            }
            
            const validPassword = bcrypt.compareSync(password, user.password);
            
            if (!validPassword){  
                return res.status(400).json({message:`Пароль неверный`})
            }
            const token = generateAccessToken(user._id, user.roles)
            //res.json("server work")
            return res.json({token})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req, res) {
        try {
            /* 
            Hardcode create roles and users
            *
            const userRole = new Role()
            const adminRole = new Role({value: 'ADMIN'})
            await userRole.save()
            await adminRole.save() 
            const userName = new User({username: '', password: '', roles: 'USER'})
            await userName.save()
            */

            const users = await User.find()
            res.json(users)
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
