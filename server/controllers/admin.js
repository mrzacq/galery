const {User, Post} = require('../models')

class PhotoController {
    static findAll(req, res, next){
        Post.findAll()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static getById(req, res, next){
        const {id} = req.params
        Post.findAll({where: {id: id}})
        .then(post => {
            if(post.length === 0) throw {message: "Post not found"}
            else{
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static createPhoto(req, res, next){
        const {title, description, photographer, categories, photo_url} = req.body
        Post.create({title, description, date: new Date(), photographer, categories, photo_url, UserId: req.loggedIn.id})
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static updatePhoto(req, res, next){
        const {title, description, photographer, categories, photo_url} = req.body
        const {id} = req.params
        Post.update({title, description, date: new Date(), photographer, categories, photo_url},{where: {id: id}})
        .then(post => {
            res.status(200).json({post, message: 'success update post'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static deletePhoto(req, res, next){
        const {id} = req.params
        console.log(req.loggedIn.id)
        Post.destroy({where: {id: id}})
        .then(post => {
            res.status(200).json({post, message: 'success delete post'})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}
module.exports = PhotoController