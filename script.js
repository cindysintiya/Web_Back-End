const http = require('http')
const fs = require('fs')
const hostname = 'localhost'
const port = 347

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    const data = fs.readFileSync("Latihan5_211110347.html")
    res.end(data)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})