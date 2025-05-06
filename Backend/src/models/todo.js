const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: [String],
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
}, {timestamps: true});

const TodoM = mongoose.model('Todo', todoSchema);

async function deleteUserTodo(uid){
    const {deletedCount} = await TodoM.deleteMany({uid});
    return deletedCount
}

async function createTODO(title, desciption, uid){
    const todo = await TodoM.create({
        title: title,
        description: desciption,
        uid: uid
    })
    console.log("backendCreated: ",todo);
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

async function getAllTODO(limit,skip, uid){
    try {
      const todos = await TodoM.find({ uid }).skip(skip).limit(limit).sort({ _id: -1 });;
      const total = await TodoM.countDocuments({ uid }); 
      
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
    getAllTODO,
    deleteUserTodo,
}