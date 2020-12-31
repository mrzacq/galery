const {verifyToken} = require('../helper/token')
const {User, Post} = require('../models')

async function authentication(req, res, next){
    let {token} = req.headers
    try{
        if(!token) throw {message: "authentication failed", code: 401}
        else{
            let decode = verifyToken(token)
            let user = await User.findOne({where: {email: decode.email}})
            if(!user) throw {message: "authentication failed", code: 401}
            else{
                req.loggedIn = decode
                next()
            }
        }
    } catch(err){
        res.status(500).json(err)
    }
}

async function authorization(req, res, next) {
    try {
      let post = await Post.findByPk(req.params.id);
      if (!post) throw { message: "Post not found", code: 404 };
      if (req.loggedIn.id === post.UserId) {
        next();
      } else throw { message: "Not authorized", code: 403 };
    } catch (err) {
      next(err);
    }
  }

module.exports = {authentication, authorization}