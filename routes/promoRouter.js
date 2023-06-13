const express = require('express');
const promoRouter = express.Router();
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
promoRouter.use(bodyParser.json());
// promoRouter.route('/').
//   get((req, res, next) => {
//     res.end('Will send all the promotions to you')
//   })
//   .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /promotions/ ' + req.params.promoId)
//   })
//   .put((req, res, next) => {
//     res.write('Updating the promo: ' + req.params.promoId + '\n');
//     res.end('will update the promo' + req.body.name + 'with details: ' + req.body.description);
//   })
//   .delete((req, res, next) => {
//     res.end('Delete all promotions');
//   });

// promoRouter.route('/:promoId')
//   .get((req, res, next) => {
//     res.end('Will send details of the promo ' + req.params.promoId + ' to you');
//   })
//   .post((req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /promotions/' + req.params.promoId)
//   })
//   .put((req, res, next) => {
//     res.write('Updating the promo: ' + req.params.promoId + '\n');
//     res.end('will update the promo' + req.body.name + 'with details: ' + req.body.description);
//   })
//   .delete((req, res, next) => {
//     res.end('Deleting promo:' + req.params.promoId);
//   });


const Promotion = require('../models/promotions');



promoRouter.route('/')
  .get((req, res, next) => {
    Promotion.find({})
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => {
        console.log('Promotion created:', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      })
      .catch((err) => next(err));
  });

promoRouter.route('/:promoId')
  .get((req, res, next) => {
    Promotion.findById(req.params.promoId)
      .then((promotion) => {
        if (promotion) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promotion);
        } else {
          const err = new Error(`Promotion ${req.params.promoId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promoId, {
      $set: req.body
    }, { new: true })
      .then((promotion) => {
        if (promotion) {
          console.log('Promotion updated:', promotion);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promotion);
        } else {
          const err = new Error(`Promotion ${req.params.promoId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promoId)
      .then((response) => {
        if (response) {
          console.log('Promotion deleted:', response);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
        } else {
          const err = new Error(`Promotion ${req.params.promoId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });


module.exports = promoRouter