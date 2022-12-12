import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const hostname = '127.0.0.1'
const port = 3000

app.use(express.static('public'))

const fileDir = __dirname + '/public/tmdbMovies.json/tmdbMovies.json'
const fileJson = readFileSync(fileDir)
let parseJson = JSON.parse(fileJson)

app.get('/api/movies', (req, res) => {
    res.json(parseJson)
})

app.get('/api/movie/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let dataId = parseJson.find(item => item.id == id)
    if (dataId != undefined) {
        res.status(200).json(dataId)
    }
    else {
        res.status(404).send("Movie is not found")
    }
})

app.put('/api/movie/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let dataId = parseJson.find(item => item.id == id)
    if (dataId != undefined) {
        const reqQuery = req.query.id
        if (reqQuery == undefined || reqQuery == "") {
            res.send("Can't change id to null/ undefined value")
        }
        else {
            dataId.id = parseInt(reqQuery)
            writeFileSync(fileDir, JSON.stringify(parseJson))
            console.log(`Data with id ${id} succesfully change to id ${reqQuery}`);
            res.status(200).json(dataId)
        }
    }
    else {
        res.status(404).send("Movie is not found")
    }
})

app.delete('/api/movie/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let dataId = parseJson.find(item => item.id == id)
    let posisi = parseJson.indexOf(dataId)
    parseJson.splice(posisi, 1)
    if (dataId != undefined) {
        writeFileSync(fileDir, JSON.stringify(parseJson))
        res.status(200).send("Movie deleted successfully")
    }
    else {
        res.status(404).send("Movie is not found")
    }
})

app.get('*', (req, res) => {
    res.status(404).end('404 Page Not Found')
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})