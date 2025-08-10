const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  async register(req, res) {
    try {
      const { name, email, password, university } = req.body;

      if (!name || !email || !password || !university) {
        return res.status(400).send({ message: 'Missing required fields: name, email, password, and university are required.' });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken.' });
      }

      // Hash password
      const password_hash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password_hash,
        university
      });

      // Issue auth cookie on successful registration
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).send({ message: 'User registered successfully', user: { id: newUser.id, name: newUser.name, email: newUser.email, university: newUser.university } });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error registering user', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log('Login request:', { email, password });

      // Find user by email
      const user = await User.findOne({ where: { email }, attributes: { include: ['password_hash'] }  });
      console.log('User found:', user ? user.toJSON() : null); // Log user data
      if (!user) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).send({ message: 'Login successful', jwt_token: token});
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error logging in', error: error.message });
    }
  },

  async logout(req, res) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    res.status(200).send({ message: 'Logout successful' });
  },
};

module.exports = authController;
