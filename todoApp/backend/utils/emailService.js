const nodemailer = require('nodemailer');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

// Initialize Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP server
  port: 587,
  secure: false,
  auth: {
    user: 'user@example.com', // Replace with your SMTP username
    pass: 'password', // Replace with your SMTP password
  },
});

// Function to send registration email
const sendRegistrationEmail = async (email, token) => {
  const mailOptions = {
    from: 'no-reply@example.com',
    to: email,
    subject: 'Registration Confirmation',
    text: `Please confirm your registration by clicking on the following link: http://localhost:3000/confirm?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw new Error('Error sending registration email');
  }
};

module.exports = {
  sendRegistrationEmail,
  sequelize,
  User,
};
```
