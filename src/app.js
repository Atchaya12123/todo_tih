const express = require('express')
const todoRouter = require('./routes/todo')
const app = express()
const PORT = 3001

app.use(express.json())
app.use('/todo', todoRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})