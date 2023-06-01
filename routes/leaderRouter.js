const express = require('express');
const leaderRouter = express.Router();
const bodyParser = require('body-parser');

leaderRouter.use(bodyParser.json());
leaderRouter.route('/').
  get((req, res, next) => {
    res.end('Will send all the leaders to you')
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leader/ ' + req.params.leaderId)
  })
  .put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('will update the leader' + req.body.name + 'with details: ' + req.body.description);
  })
  .delete((req, res, next) => {
    res.end('Delete all leaders');
  });

leaderRouter.route('/:leaderId')
  .get((req, res, next) => {
    res.end('Will send details of  the leader ' + req.params.leaderId + ' to you');
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leader/' + req.params.leaderId)
  })
  .put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('will update the leader' + req.body.name + 'with details: ' + req.body.description);
  })
  .delete((req, res, next) => {
    res.end('Deleting leader:' + req.params.leaderId);
  });
module.exports = leaderRouter