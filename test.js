const mongoose = require('mongoose');
const BlogPost = require('./models/blog_post');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

BlogPost.create({
    title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when I went on ITV Tonight. Energy-saving is one of my favourite money topics, because once you get past the boring bullet- point lists, a whole new world of thrifty nerderyopens up.You know those bullet - point lists.You start spotting them everything at this time of year'

}, (error, blogpost) => {
    console.log(error, blogpost);
});

BlogPost.find({}, (error, blogpost) => {
    console.log(error, blogpost);
});