const BlogPost = require('../models/blog_post');
const path = require('path');

module.exports = async (req, res) => {

    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..','public/img', image.name),
        async (error) => {
          
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name,
                userid: req.session.userId,
                
            })
            console.log(error)
            res.redirect('/')
        })
}