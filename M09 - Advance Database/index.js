const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()

// parse application/ json
app.use(bodyParser.json())
// parse application/ form-encode
app.use(bodyParser.urlencoded())

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

// tabel PRODUCT
// tampilkan semua data product
app.get('/api/products', (req, res) => {
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
app.get('/api/product/:id', (req, res) => {
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
app.post('/api/product', (req, res) => {
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
app.put('/api/product/:id', (req, res) => {
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
app.delete('/api/product/:id', (req, res) => {
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

// tabel COMMENT
// tampilkan 5 data comment teratas/ terbaru
app.get('/api/comments', (req, res) => {
    let sql = 'SELECT * FROM comment ORDER BY comment_created DESC LIMIT 5'
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// tampilkan data comment berdasarkan id
app.get('/api/comment/:id', (req, res) => {
    let sql = 'SELECT * FROM comment WHERE comment_id=' + req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.length === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json(result)
        }
    })
})

// tampilkan data comments customer berdasarkan id diurutkan
app.get('/api/comments/customer/:id', (req, res) => {
    let sql = 'SELECT * FROM comment WHERE cust_id=' + req.params.id + ' ORDER BY comment_created DESC'
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.length === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json(result)
        }
    })
})

// tambahkan data comment baru
app.post('/api/comment', (req, res) => {
    let data = {
        cust_id  : req.body.customer_id,
        product_id : req.body.product_id,
        comment_text : req.body.comment_text
    }
    let sql = 'INSERT INTO comment SET ?'
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(data);
        res.json({
            "status" : "SUCCESS"
        })
    })
})

// edit data comment berdasarkan id
app.put('/api/comment/:id', (req, res) => {
    let sql = "UPDATE comment SET comment_text='" + req.body.comment_text + "' WHERE comment_id=" + req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.affectedRows === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json({
                "status" : "UPDATED"
            })
        }
    })
})

// delete data comment berdasarkan id
app.delete('/api/comment/:id', (req, res) => {
    let sql = "DELETE FROM comment WHERE comment_id=" + req.params.id
    let query = conn.query(sql, (err, result) => {
        if (err) throw err
        if (result.affectedRows === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json({
                "status" : "DELETED"
            })
        }
    })
})

// Server listening
app.listen(347, () => {
    console.log("Server started at localhost:347");
})