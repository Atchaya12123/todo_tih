const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user')
const { deleteUserTodo } = require('../models/todo')

const express = require('express');

const router = express.Router()

router.delete('/account', async (req, res) => {
  const { uid } = req.body;
  console.log("somehow its undef",uid);
  try{
    const user = await User.deleteOne({_id:uid});
    console.log(user);
    const count = await deleteUserTodo(uid);
    console.log(count);
    res.status(201).json({ count });
  
  }catch(error){
    console.error(error);
    res.status(400).json({ message: 'Failed to delete Todos' });
  }
});

router.post('/signup', async (req, res) => {
  
    const { username, password, email } = req.body;
    console.log(password);
  
    try {
      // Check if username already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already taken' });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        username,
        password: hashedPassword,
        email
      });
  
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, username: newUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({ token, name: newUser.username });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


router.post('/login', async (req, res) => {
  const { password, email } = req.body;

  try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      console.log(user)

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log(user)
          return res.status(400).json({ message: 'Pswd mismatch' });
      }

      // Generate JWT token
      const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
      );

      res.json({ token, name: user.username });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router