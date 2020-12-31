const {User} = require('../models')
const {comparePassword} = require('../helper/bcrypt')
const {generateToken} = require('../helper/token')
class UserController{
    static register(req, res, next){
        const {email, password, role} = req.body
        User.create({email, password, role})
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static login(req, res, next){
        const {email, password, role} = req.body
        User.findOne({where: {email: email, role: role}})
        .then(user => {
            if(!user) throw {msg: 'invalid email or password'}
            if(!comparePassword(password, user.password)) throw {msg: 'invalid email or password', code: 400}
            else {
                const token = generateToken({id: user.id, email: user.email, role: user.role})
                res.status(200).json({email: user.email, token, role: user.role})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports=UserController