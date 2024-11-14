const pool = require('../database');

async function getUserByUsername(username) {
  if (!username || typeof username !== 'string') {
    throw new Error('Invalid username');
  }
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

async function createUser(username, password) {
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('Invalid username or password');
  }
  const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
  return result.insertId;
}

async function updateUser(id, username, password) {
  if (!id || !username || !password || typeof id !== 'number' || typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('Invalid user data');
  }
  await pool.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, password, id]);
}

module.exports = {
  getUserByUsername,
  createUser,
  updateUser
};