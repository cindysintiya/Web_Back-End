const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()

// use cors
const cors = require('cors');
app.use(cors());

// parse application/ json
app.use(bodyParser.json())
// parse application/ form-encode
app.use(bodyParser.urlencoded({extended: true}))

// create database connection
const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'crud_db'
})

// connect to databse
conn.connect((err) => {
    if (err) throw err
    console.log('MySql Connected ...');
})

// logging request activity
const myLog = (req, res, next) => {
    console.log("Request URL :", req.url);
    console.log("Request Type:", req.method);
    next()
}

// cek sudah sesuai syarat data atau belum
const syaratProduct = (req, res, next) => {
    if (req.body.product_price <= 0) {
        res.json({"error" : "product_price tidak boleh <=0"})
    }
    else if (isNaN(req.body.product_price)) {
        res.json({"error" : "product_price wajib diisi dengan angka"})
    }
    else {
        next()
    }
}
const syaratUser = (req, res, next) => {
    if (req.body.user_name.trim() === "" || req.body.user_email.trim() === "" || req.body.user_address.trim() === "" || req.body.user_phone.trim() === "") {
        res.json({"error" : "semua field wajib diisi"})
    }
    else {
        next()
    }
}

// tampilkan log ketika melakukan request
app.use(myLog)

// handling internal server error
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// tabel PRODUCT
// tampilkan semua data product
app.get('/api/products', function (req, res, next) {
    let sql = 'SELECT * FROM product'
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        res.json({
            'status'   : 200, 
            'error'    : null,
            'response' : result
        })
    })
})

// tampilkan data product berdasarkan id
app.get('/api/product/:id', function (req, res, next) {
    let sql = 'SELECT * FROM product WHERE product_id=' + req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.length === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json({
                "status"   : res.statusCode,
                "error"    : err,
                "response" : result
            })
        }
    })
})

// tambahkan data product baru
app.post('/api/product', syaratProduct, function (req, res, next) {
    let data = {
        product_name  : req.body.product_name,
        product_price : req.body.product_price
    }
    let sql = 'INSERT INTO product SET ?'
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(data);
        res.json({
            'status'   : 200, 
            'error'    : null,
            'response' : 'Insert Data SUCCESS'
        })
    })
})

// edit data product berdasarkan id
app.put('/api/product/:id', syaratProduct, function (req, res, next) {
    let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "' WHERE product_id=" + req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.affectedRows === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json({
                "status"   : res.statusCode,
                "error"    : err,
                "response" : "Update Data SUCCESS"
            })
        }
    })
})

// delete data product berdasarkan id
app.delete('/api/product/:id', (req, res, next) => {
    let sql = "DELETE FROM product WHERE product_id=" +req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.affectedRows === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json({
                "status"   : res.statusCode,
                "error"    : err,
                "response" : "Delete data SUCCESS"
            })
        }
    })
})

// tabel USER
// tampilkan semua data user
app.get('/api/users', function (req, res, next) {
    let sql = 'SELECT * FROM user'
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

// tampilkan data user berdasarkan id
app.get('/api/user/:id', function (req, res, next) {
    let sql = 'SELECT * FROM user WHERE user_id=' + req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.length === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json(result[0])
        }
    })
})

// tambahkan data user baru
app.post('/api/user', syaratUser, function (req, res, next) {
    let data = {
        user_name    : req.body.user_name,
        user_email   : req.body.user_email,
        user_address : req.body.user_address,
        user_phone   : req.body.user_phone
    }
    let sql = 'INSERT INTO user SET ?'
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(data);
        res.json(result)
    })
})

// edit data user berdasarkan id
app.put('/api/user/:id', syaratUser, function (req, res, next) {
    let sql = "UPDATE user SET user_name='" + req.body.user_name + "', user_email='" + req.body.user_email + "', user_address='" + req.body.user_address +"', user_phone='" + req.body.user_phone + "' WHERE user_id=" + req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.affectedRows === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json(result)
        }
    })
})

// delete data user berdasarkan id
app.delete('/api/user/:id', (req, res, next) => {
    let sql = "DELETE FROM user WHERE user_id=" +req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.affectedRows === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json(result)
        }
    })
})

// Server listening
app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
})