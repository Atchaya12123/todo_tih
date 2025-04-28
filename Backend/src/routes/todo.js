const express = require('express')
const { createTODO,deleteTODO, updateTODO,getAllTODO } = require('../models/todo')

const router = express.Router()

router.post('/',async(req,res)=>{
    console.log(req.body);
    const {title, description} = req.body
    console.log(title);
    const todo = createTODO(title, description)
    console.log(todo)
    res.status(201).send(todo)
})

router.delete('/:id', async (req, res) => {
    try {
      const delId = req.params.id;  // ✅ Correct way to access :id
      const resp = await deleteTODO(delId); // ✅ Passing raw string id
      res.status(200).send({ message: 'Todo deleted successfully', result: resp });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).send({ error: 'Failed to delete todo' });
    }
  });
  

router.put('/:id',async(req,res)=>{
    
    const id = req.params.id
    const {title, description} = req.body
    const todo = await updateTODO(id, title, description)
    res.status(200).send(todo)
})

// router.get('/todos?page=1&limit=10',async(req,res)=>{

router.get('/allTodos', async (req, res) => {
    try {
        console.log("reached");
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;
      const { todos, total } = await getAllTODO(limit,skip);
      const pgTot = Math.ceil(total / limit);
      res.json({
        total: pgTot,
        todos: todos
      });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
module.exports = router