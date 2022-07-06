const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleWare = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const flash = require('connect-flash');
const logoutController = require('./controllers/logout');


const app = express();

app.set('view engine', 'ejs');
global.loggedIn = null;

app.set('views', 'views');
app.use(express.static('public'))



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true}));
app.use('/posts/store', validateMiddleWare)
app.use(expressSession({secret: 'keyboard dog', resave: false, saveUninitialized: false}));


app.use(flash());
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});


app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', authMiddleware, newPostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.get('/auth/logout', logoutController);

app.post('/posts/store', authMiddleware, storePostController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.use((req, res) => res.render('notfound'))


mongoose.connect('mongodb+srv://PeeBlog:Jeremiah99@cluster0.clynv.mongodb.net/test', { useNewUrlParser: true });
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log('App is Listening...')
})