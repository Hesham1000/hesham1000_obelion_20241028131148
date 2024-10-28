const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ where: { email } });
    
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    
    res.status(201).json({ success: true, message: 'Registration successful! Please check your email for confirmation.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
    
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

module.exports = router;
```
