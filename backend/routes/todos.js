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
    res.json([1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12].map(number => ({
      id: number,
      name: `test ${number}`,
      status: 'done'
    })).filter(({name}) => {
      if (!req.query.keyword) {
        return true;
      }
      return !!name.includes(req.query.keyword)
    }));
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
