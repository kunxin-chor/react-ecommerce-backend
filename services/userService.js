const userData = require('../data/userData');
const bcrypt = require('bcrypt');

async function registerUser(username, password) {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  
  const existingUser = await userData.getUserByUsername(username);
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userData.createUser(username, hashedPassword);
}

async function loginUser(username, password) {
  const user = await userData.getUserByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser
};