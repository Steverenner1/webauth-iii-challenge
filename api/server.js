const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send("It's alive!");
});

server.get('/token', (req, res) => {
    const payload = {
        subject: 'user',
        name: 'usename',
        title: 'manager'
    };
    const secret = 'bossman';
    const options = {
        expiresIn: '1d'
    };

    const token = jwt.sign(payload, secret, options);
    res.status(201).json(token)
})

module.exports = server;