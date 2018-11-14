require('./config')
var {Users} = require('./users')
var users = Users.credentials

const express = require('express')
const bodyParser = require('body-parser')

var cors = require('cors')
var app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    let user = req.body.userName
    let pass = req.body.userPass

    if(!user || !pass) {
        return res.status(400).send('Bad request')
    }

    var foundUser = users.find((item) => {
        return item.userName === user && item.userPass === pass
    })

    if (foundUser) {
        res.status(200).send({"status": "OK", "token": foundUser.token, "role": foundUser.role})
    } else {
        res.status(403).send('Unauthorized')
    }
})

var authorize_admin = (req, res, next) => {
    var token = req.header('x-auth')

    var foundUser = users.find((item) => {
        return item.token === token
    })

    if (foundUser && foundUser.role === 'admin') {
        next()
    } else if(foundUser && foundUser.role !== 'admin') {
        res.status(403).send('Only admin access')
    } else {
        res.status(400).send('Bad request')
    }

}

app.get('/sensitive-data', authorize_admin, (req, res) => {
    res.status(200).send('Very sensitive data')
})

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

module.exports = {app}

