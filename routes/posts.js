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

module.exports = router;
