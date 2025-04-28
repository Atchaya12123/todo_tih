const express = require('express')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')
const cors=require('cors')
require('./db/mongo')
require('dotenv').config();
const app = express()
const PORT = 3001
app.use(cors());
app.use(express.json())
app.use('/todo', todoRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})