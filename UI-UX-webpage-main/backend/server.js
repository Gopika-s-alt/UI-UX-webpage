
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// TEST ROUTE
app.get('/', (req, res) => {
  res.send('Backend Running');
});


// ======================
// SIGNUP ROUTE
// ======================

app.post('/signup', async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const result = await pool.query(
      `INSERT INTO users(name, email, password_hash)
       VALUES($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'Signup successful',
      user: result.rows[0]
    });

  } catch (err) {

    console.log("SIGNUP ERROR:");
    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// ======================
// LOGIN ROUTE
// ======================

app.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    // find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    // user not found
    if (result.rows.length === 0) {
      return res.status(400).json({
        message: 'Invalid email or password'
      });
    }

    const user = result.rows[0];

    // compare password
    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    // wrong password
    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid email or password'
      });
    }

    // success login
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {

    console.log("LOGIN ERROR:");
    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// START SERVER
app.listen(5000,'0.0.0.0', () => {
  console.log('Server running on port 5000');
});

