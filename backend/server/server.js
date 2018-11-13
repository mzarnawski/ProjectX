require('./config')

const express = require('express')
const bodyParser = require('body-parser')

var users = [
    {userName: 'user1', userPass: 'password', token: '', role: 'user'},
    {userName: 'admin', userPass: 'password1234', token: '12345', role: 'admin'}
]

var cors = require('cors')

var app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    console.log(req)
    let user = req.body.userName
    let pass = req.body.userPass

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
    } else {
        res.status(401).send()
    }

}

app.get('/sensitive-data', authorize_admin, (req, res) => {
    res.status(200).send('Very sensitive data')
})

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

module.exports = {app}

