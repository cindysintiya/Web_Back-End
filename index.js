const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'crud_db'
});

// connect to database
conn.connect((err) => {
    if (err) throw err
    console.log('MySql Connected...');
})

// tabel PRODUCT
// tampilkan semua data product
app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM product"
    let query = conn.query(sql, (err, results) => {
        if (err) throw err
        res.json({
            "status"   : res.statusCode,
            "error"    : err,
            "response" : results
        })
    })
})

// tampilkan data product berdasarkan id
app.get('/api/product/:id', (req, res) => {
    let sql = "SELECT * FROM product WHERE product_id=" + req.params.id
    let query = conn.query(sql, (err, results) => {
        if (err) throw err
        if (results.length === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json({
                "status"   : res.statusCode,
                "error"    : err,
                "response" : results
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
    let sql = "INSERT INTO product SET ?"
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err
        console.log(data);
        res.json({
            "status"   : res.statusCode,
            "error"    : err,
            "response" : "Insert Data Success"
        })
    })
})

// edit data product berdasarkan id
app.put('/api/product/:id', (req, res) => {
    let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price=" + req.body.product_price + " WHERE product_id=" + req.params.id
    let query = conn.query(sql, (err, results) => {
        if (err) throw err
        if (results.length === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json({
                "status"   : res.statusCode,
                "error"    : err,
                "response" : "Update Data Success"
            })
        }
    })
})

// hapus data product berdasarkan id
app.delete('/api/product/:id', (req, res) => {
    let sql = "DELETE FROM product WHERE product_id=" + req.params.id
    let query = conn.query(sql, (err, results) => {
        if (err) throw err
        res.json({
            "status"   : res.statusCode,
            "error"    : err,
            "response" : "Delete Data Success"
        })
    })
})


// tabel COMMENT
// tampilkan 5 data comment terbaru
app.get('/api/comments', (req, res) => {
    let sql = "SELECT * FROM comment ORDER BY comment_created DESC LIMIT 5"
    let query = conn.query(sql, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

// tampilkan data comment berdasarkan comment_id
app.get('/api/comment/:id', (req, res) => {
    let sql = "SELECT * FROM comment WHERE comment_id=" + req.params.id
    let query = conn.query(sql, (err, results) => {
        if (err) throw err
        if (results.length === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json(results)
        }
    })
})

// tampilkan data comment berdasarkan cust_id diurutkan terbaru
app.get('/api/comments/customer/:id', (req, res) => {
    let sql = "SELECT * FROM comment WHERE cust_id=" + req.params.id + " ORDER BY comment_created DESC"
    let query = conn.query(sql, (err, results) => {
        if (err) throw err
        if (results.length === 0) {
            res.statusCode = 404
            res.end('ID Not Found')
        }
        else {
            res.json(results)
        }
    })
})

// tambahkan data comment baru
app.post('/api/comment', (req, res) => {
    let data = {
        cust_id      : req.body.customer_id,
        product_id   : req.body.product_id,
        comment_text : req.body.comment_text
    }
    let sql = "INSERT INTO comment SET ?"
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err
        console.log(data);
        res.json({"status" : "SUCCESS"})
    })
})

// hapus data comment berdasarkan comment_id
app.delete('/api/comment/:id', (req, res) => {
    let sql = "DELETE FROM comment WHERE comment_id=" + req.params.id
    let query = conn.query(sql, (err, results) => {
        if (err) throw err
        res.json({"status" : "DELETED"})
    })
})

// Server Listening
app.listen(347, () => {
    console.log("Server running at localhost:347");
})