const express = require('express');
const db = require('./../db');
const router = express.Router();
const randomID = require('@bosiu/id-generator');

const confirm = { message: 'OK' };

router.route('/concerts').get((req, res) => {
  res.json( db.concerts );
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(t => t.id ===  parseInt(req.params.id)));
});

router.route('/concerts').post((req, res) => {
  db.concerts.push({ 
    id: randomID(10), 
    performer: req.body.performer, 
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  });

  res.json(confirm);
});

router.route('/concerts/:id').put((req, res) => {
  for(let i = 0; i < db.concerts.length; i++){
    if(db.concerts[i].id === parseInt(req.params.id)){
      db.concerts[i].performer = req.body.performer, 
      db.concerts[i].genre = req.body.genre,
      db.concerts[i].price = req.body.price,
      db.concerts[i].day = req.body.day,
      db.concerts[i].image = req.body.image,

      res.json(confirm);
      } else {
        res.json({message: 'Data with this id doesnt exists'})
      }
    }
  }
);

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(db.concerts.filter(t => t.id === parseInt(req.params.id),), 1);

  res.json(confirm);
});

module.exports = router;
