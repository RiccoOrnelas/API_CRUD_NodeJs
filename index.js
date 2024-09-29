const express = require('express')
const db = require('./models/db')
const app = express()
const port = 3000

const userName = 'HenriqueOrnelas'
const PassWord = 43548075

app.set('view engine', 'ejs')
// Middleware para parsear JSON
app.use(express.json())

// Verificação de validade dos dados 
function Validation(req, res, next) {
    if (!req.body.userName || !req.body.PassWord) {
        res.send('Invalide Data')
    }
    next()
}

// Valicação de acesso 
function Autorization(req, res, next) {
    if (req.body.userName === userName && req.body.PassWord === PassWord) {
        res.send('All Right')
    } else {
        res.status(401).send('Invalid credentials')
    }
}

async function userCreation(req, res) {
    await db.insertData(req.body.nome, req.body.email, req.body.PassWord)
    res.send('User created')
    await db.close()
}

async function queryData(req, res) {
    const data = await db.queryData
    res.send(data)
    await db.close
}

app.post('/', Validation, Autorization)
app.post('/createUser', userCreation)
app.get('/', queryData)
app.listen(port, () => {
    console.log(`Port ${port} is on!`)
})