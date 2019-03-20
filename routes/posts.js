const express = require('express');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The posts could not be retrieved.'});
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDb.getById(id)
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.'});
      } else {
        res.status(200).json(post);
      }
    })
      .catch((error) => {
        res.status(500).json({ error: 'The post information could not be retrieved.'});
      });
});

router.post('/', (req, res) => {
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res.status(400).json({ errorMessage: 'Please provide text and user id for the post.'});
  }
  postDb.insert({ text, user_id })
    .then((data) => {
      res.status(201).json({
        text,
        user_id,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'There was an error while saving the post to the database.'});
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  postDb.update(id, post)
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'The post with the specified id does not exist.' });
        } else {
          res.status(200).json({ post: { id, ...post} });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The post information could not be modified.' });
      });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  postDb.remove(id)
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        } else {
          res.status(200).json({ message: `The post with the ID ${id} has now been removed from the database.` });
        }
      })
      .catch((error) => {
        res.status(500).json({ errorMessage: 'The post could not be removed.' });
  });
});

module.exports = router;
