const { upperCaseNameMiddleware } = require('../middleware');
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

router.post('/', upperCaseNameMiddleware, (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: 'Please provide a name for the user.' });
  }
  userDb.insert({ name })
    .then((data) => {
      res.status(201).json({
        name,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'There was an error while saving the user to the database.' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  userDb.remove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.status(200).json({ message: `The user with the id ${id} has now been removed from the database.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'The user could not be removed.' });
    });
});

router.put('/:id', upperCaseNameMiddleware, (req, res) => {
  const { id } =req.params;
  const user = req.body;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: 'Please provide a name for the user.' });
  }
  userDb.update(id, user)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'The user with the specified id does not exist.' });
      } else {
        res.status(200).json({ user: {id, ...user }});
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The post information could not be modified.' });
    });
});

module.exports = router;
