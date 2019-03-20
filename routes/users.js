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

router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  userDb.getById(user_id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'The user with the specified ID does not exist' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The user information could not be retrieved.' });
    });
});

router.get('/:user_id/posts', (req, res) => {
  const { user_id } = req.params;
  userDb.getUserPosts(user_id)
      .then((posts) => {
        if (!posts) {
          res.status(404).json({ message: 'The user with the specified ID does not have any posts' });
        } else {
          res.status(200).json(posts)
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The user posts could not be retrieved.' });
      });
});

module.exports = router;
