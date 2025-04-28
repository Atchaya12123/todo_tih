const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: [String],
        required: true
    }
}, {timestamps: true});

const TodoM = mongoose.model('Todo', todoSchema);

async function createTODO(title, desciption){
    const todo = await TodoM.create({
        title: title,
        description: desciption
    })
    console.log("backend: ",todo);
    return todo   
}

async function deleteTODO(id){
    const todo = await TodoM.findByIdAndDelete(id)
    return todo
}

async function updateTODO(id, title, description){
    const todo = await TodoM.findByIdAndUpdate(id, {title, description}, {new: true})
    return todo
}

async function getAllTODO(limit,skip){
    try {
      const todos = await TodoM.find().skip(skip).limit(limit).sort({ _id: -1 });;
      const total = await TodoM.countDocuments(); 
      
    return {todos, total}
    }
    catch{
        console.error(error);
    }
}

module.exports = {
    createTODO,
    deleteTODO,
    updateTODO,
    getAllTODO
}