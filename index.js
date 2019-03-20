// code away!
const express = require('express');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRoutes);
server.use('/api/users', usersRoutes);

server.listen(5000, () => console.log('Listening on port 5000!'));
