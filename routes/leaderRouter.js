const express = require('express');
const leaderRouter = express.Router();
const bodyParser = require('body-parser');
// const express = require('express');
const Leader = require('../models/leaders');
var authenticate = require('../authenticate');
// const leaderRouter = express.Router();

leaderRouter.route('/')
  .get((req, res, next) => {
    Leader.find({})
      .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Leader.create(req.body)
      .then((leader) => {
        console.log('Leader created:', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      })
      .catch((err) => next(err));
  });
leaderRouter.route('/:leaderId')
  .get((req, res, next) => {
    Leader.findById(req.params.leaderId)
      .then((leader) => {
        if (leader) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(leader);
        } else {
          const err = new Error(`Leader ${req.params.leaderId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Leader.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, { new: true })
      .then((leader) => {
        if (leader) {
          console.log('Leader updated:', leader);
          res.statusCode = 200;

          res.setHeader('Content-Type', 'application/json');
          res.json(leader);
        } else {
          const err = new Error(`Leader ${req.params.leaderId} not found`
          );
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Leader.findByIdAndDelete(req.params.leaderId)
      .then((response) => {
        if (response) {
          console.log('Leader deleted:', response);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
        } else {
          const err = new Error(`Leader ${req.params.leaderId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });
module.exports = leaderRouter;

// leaderRouter.use(bodyParser.json());
// leaderRouter.route('/').
//   get((req, res, next) => {
//     res.end('Will send all the leaders to you')
//   })
//   .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /leader/ ' + req.params.leaderId)
//   })
//   .put((req, res, next) => {
//     res.write('Updating the leader: ' + req.params.leaderId + '\n');
//     res.end('will update the leader' + req.body.name + 'with details: ' + req.body.description);
//   })
//   .delete((req, res, next) => {
//     res.end('Delete all leaders');
//   });

// leaderRouter.route('/:leaderId')
//   .get((req, res, next) => {
//     res.end('Will send details of  the leader ' + req.params.leaderId + ' to you');
//   })
//   .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /leader/' + req.params.leaderId)
//   })
//   .put((req, res, next) => {
//     res.write('Updating the leader: ' + req.params.leaderId + '\n');
//     res.end('will update the leader' + req.body.name + 'with details: ' + req.body.description);
//   })
//   .delete((req, res, next) => {
//     res.end('Deleting leader:' + req.params.leaderId);
//   });
module.exports = leaderRouter