const express = require('express')
const { createTODO } = require('../models/todo')
const router = express.Router()

router.post('/',async(req,res)=>{
    console.log(req.body);
    const {title, description} = req.body
    const todo = createTODO(title, description)
    res.status(201).send(todo)
})
module.exports = router