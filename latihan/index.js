import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const hostname = '127.0.0.1'
const port = 347

app.use(express.static('public'))

app.get('(/home)?', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html')
})

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/pages/products.html')
})

app.get('/special', (req, res) => {
    res.sendFile(__dirname + '/pages/special.html')
})

app.get('/popular', (req, res) => {
    res.sendFile(__dirname + '/pages/popular.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/pages/about.html')
})

app.get('/product(/:nama)?', (req, res) => {
    const nama = req.params.nama
    res.send(`<h1>Product Name : ${nama}</h1>`)
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/pages/404notfound.html')
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})
