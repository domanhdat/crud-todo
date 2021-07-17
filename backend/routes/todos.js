const express = require('express');
const router = express.Router();
// const connectPromise = require('./../utils/mysql');

router.get('/', async function(req, res, next) {
  try {
    // const connection = await connectPromise();
    // connection.query('SELECT 1', function (error, results, fields) {
    //   if (error) throw error;
    //   res.json(results);
    // })
    res.json([
      {
        id: 1,
        name: 'test',
        status: 'done'
      },
      {
        id: 2,
        name: 'test 2',
        status: 'done'
      },
      {
        id: 3,
        name: 'test 3',
        status: 'done'
      }
    ]);
  } catch (e) {
    res.json(e.message).status(500);
  }
});

router.post('/', function(req, res, next) {
  res.json(req.body).status(201);
});

router.put('/', function(req, res, next) {
  res.json(req.body);
});

router.delete('/', function(req, res, next) {
  res.json(req.body).status(204);
});

module.exports = router;
