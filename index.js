require('dotenv').config()
const express = require('express')
const conn = require('./db')
const UserRoutes = require('./routes/UserRoute')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use('/users', UserRoutes)

conn
  .sync()
  .then(() => app.listen(PORT))
  .catch((err) => console.error(err))
