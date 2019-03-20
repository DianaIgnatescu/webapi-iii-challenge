const express = require('express');

const userDb = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {
  userDb.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The users could not be retrieved.'});
    });
});

module.exports = router;
