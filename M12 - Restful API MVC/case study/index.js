import express from 'express'
import { sequelize } from './models/model.js';
import Product from './models/product.js'

const app = express();
const hostname = '127.0.0.1';
const port = 347;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');

// TAMBAHAN : syarat biar gbs asal nambah data kosong
const syaratProduct = (req, res, next) => {
    if ((req.body.price <= 0) || (isNaN(req.body.price)) || (req.body.name.trim() == "")){
        console.log("Data tidak sesuai format");
        res.json({ status: 400 })
    }
    else {
        next()
    }
}

// biar tabel otomatis terbuat dulu
try {
    // tambahan from here
    sequelize.authenticate()
    Product.sync()
    // till here
}
catch {
    res.end("Error !!!")
}

// atau bisa jalankan ini dulu utk membuat tabel
app.get('/create-table', (req, res) => {
    try {
        // tambahan from here
        sequelize.authenticate()
        Product.sync()
        // till here
        res.send(`
            <body style="text-align: center; background-image: linear-gradient(135deg, pink, skyblue, violet); background-attachment: fixed; margin-top: 50px">
                <h2>Tabel berhasil dibuat/ sudah tersedia !!!<h2>
                <h1>Go to <a href="http://${hostname}:${port}">Home<a><h1>
            </body>
        `)
    }
    catch {
        res.end("Error !!!")
    }
})

app.get('/', (req, res) => {
    Product.findAll().then((results) => {
        res.render('index', { products: results })
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