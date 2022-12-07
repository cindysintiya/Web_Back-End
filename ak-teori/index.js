const express = require("express")
const path = require("path")
const logger = require("morgan")
const multer = require("multer")
const upload = multer({dest: "./public/uploads"})
const router = express.Router()

const app = express()

// Built-in Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/static", express.static(path.join(__dirname, "public")))

// Application-level Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date()} -- Request [${req.method}] [${req.url}]`);
    next()
}

app.use(loggerMiddleware)

// Third-Party Middleware
app.use(logger("combined"))

app.post("/upload", upload.single("image"), (req, res, next) => {
    console.log(req.file, req.body);
    res.send(req.file)
}, (err, req, res, next) => {
    res.status(400).send({error : err.message})
})

// Router-Level Middleware
app.use("/api/users", router)

const fakeAuth = (req, res, next) => {
    const authStatus = true
    if (authStatus) {
        console.log("Users authStatus : ", authStatus);
        next()
    } else {
        res.status(401)
        throw new Error("User is not Authorized")
    }
}

const getUsers = (req, res) => {
    res.json({message : "Get all users"})
}
const createUser = (req, res) => {
    console.log("This is the request body receive from client : ", req.body);
    res.json({message : "Create new user"})
}

router.use(fakeAuth)
router.route("/").get(getUsers).post(createUser)

// Error-Handling Middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    switch(statusCode) {
        case 401 :
            res.json({
                title : "Unauthorized",
                message : err.message
            })
            break
        case 404 :
            res.json({
                title : "Not Found",
                message : err.message
            })
            break
        case 500 :
            res.json({
                title : "Internal Server Error",
                message : err.message
            })
            break
        default :
            break
    }
}

// Get all other route
app.all("*", (req, res) => {
    res.status(404)
    throw new Error("Route not found")
})

app.use(errorHandler)

// Server Listening
app.listen(347, () => {
    console.log(`Server started on localhost:347`);
})
