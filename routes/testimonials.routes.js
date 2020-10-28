const express = require('express');
const db = require('./../db');
const router = express.Router();
const randomID = require('@bosiu/id-generator');

const confirm = { message: 'OK' };

router.route('/testimonials').get((req, res) => {
  res.json( db.testimonials );
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(t => t.id ===  parseInt(req.params.id)));
});

router.route('/testimonials').post((req, res) => {
  db.testimonials.push({ 
    id: randomID(10), 
    author: req.body.author, 
    text: req.body.text,
  });

  res.json(confirm);
});

router.route('/testimonials/:id').put((req, res) => {
  for(let i = 0; i < db.testimonials.length; i++){
    if(db.testimonials[i].id === parseInt(req.params.id)){
      db.testimonials[i].author = req.body.author;
      db.testimonials[i].text = req.body.text,
      
      res.json(confirm);
      } else {
        res.json({message: 'Data with this id doesnt exists'})
      }
    }
  }
);

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(db.testimonials.filter(t => t.id === parseInt(req.params.id),), 1);

  res.json(confirm);
});

module.exports = router;
