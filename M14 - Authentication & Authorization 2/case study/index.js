import express from 'express'
import session from 'express-session';

import { sequelize } from './models/model.js';
import Product from './models/product.js'
import User from './models/user.js';

import user_routes from './routers/user.js';
import admin_product_routes from './routers/admin/product.js';
import forAdmin from './controllers/auth.js'

const app = express();
const hostname = '127.0.0.1';
const port = 347;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');

app.use(session({
    secret : 'ini adalah secret code ###',
    resave : false,
    saveUninitialized : true,
    cookie : {
        maxAge : 60*60*1000  // 1 hour
    }
}))

// biar muncul stylenya
app.use(express.static('views'))

// biar bisa otomatis terbuat dulu tabelnya
sequelize.authenticate()
Product.sync()
User.sync()

app.use('/user', user_routes)
app.use('/admin/product', forAdmin, admin_product_routes)

app.get('/', (req, res) => {
    Product.findAll().then((results) => {
        res.render('index', { user: req.session.user || "" });
    })
})

app.get('/forbidden', (req, res) => {
    res.render('forbidden', { user: req.session.user || "" });
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})