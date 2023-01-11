import express from 'express'
import { sequelize } from './models/model.js';
import Product from './models/product.js'
import user_controller from './controllers/user.js'
import session from 'express-session';
import User from './models/user.js';

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

// syarat biar gbs asal nambah data kosong
const syaratProduct = (req, res, next) => {
    if ((req.body.price <= 0) || (isNaN(req.body.price)) || (req.body.name.trim() == "")){
        console.log("Data tidak sesuai format");
        res.json({ status: 400 })
    }
    else {
        next()
    }
}

// biar bisa otomatis terbuat dulu tabelnya
sequelize.authenticate()
Product.sync()
User.sync()

app.get("/login", user_controller.login);
app.get("/logout", user_controller.logout);
app.post("/login", user_controller.auth);

app.get('/', (req, res) => {
    Product.findAll().then((results) => {
        res.render('index', { products: results, user: req.session.user || "" });
    })
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.get('/edit/:id', (req, res) => {
    Product.findOne({ where: { id: req.params.id } }
    ).then((results) => {
        res.render('edit', { product: results });
    })
})

app.post('/api/products', syaratProduct, (req, res, next) => {
    Product.create({
        name  : req.body.name, 
        price : req.body.price 
    }).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

app.put('/api/product/:id', syaratProduct, (req, res, next) => {
    Product.update({ 
        name  : req.body.name, 
        price : req.body.price 
    }, { where: { id: req.params.id } 
    }).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

app.delete('/api/product/:id', (req, res) => {
    Product.destroy({ where: { id: req.params.id } }
    ).then(() => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 500, error: err, Response: {} });
    })
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})