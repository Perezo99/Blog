const BlogPost = require('../models/blog_post');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');
    console.log(req.session)
    res.render('index', {
        blogposts: blogposts
    })
}