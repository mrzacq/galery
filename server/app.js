const express = require('express')
const cors = require('cors')
const port = 4040
const app = express()
const router = require('./router')
const err = require('./middleware/err')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(err)
app.listen(port, () => console.log(`running http://localhost:${port}`))