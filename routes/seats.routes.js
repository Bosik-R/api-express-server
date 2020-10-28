const express = require('express');
const db = require('./../db');
const router = express.Router();
const randomID = require('@bosiu/id-generator');

const confirm = { message: 'OK' };

router.route('/seats').get((req, res) => {
  res.json( db.seats );
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(t => t.id ===  parseInt(req.params.id)));
});

router.route('/seats').post((req, res) => {
  const seatTaken = db.seats.some(data => data.day === req.params.day && data.seat === req.params.seat);
  if(seatTaken){
    res.status(403).json({massage: 'The slot is already taken...'});
  }else{

    db.seats.push({ 
      id: randomID(10), 
      day: req.body.day,
      seat: req.body.seat,
      client: req.body.client,
      email: req.body.email,
    });
  }

  res.json(confirm);
});

router.route('/seats/:id').put((req, res) => {
  for(let i = 0; i < db.seats.length; i++){
    if(db.seats[i].id === parseInt(req.params.id)){
      db.seats[i].day = req.body.day,
      db.seats[i].seat = req.body.seat,
      db.seats[i].client = req.body.client,
      db.seats[i].email = req.body.email,
        
      res.json(confirm);
      } else {
        res.json({message: 'Data with this id doesnt exists'})
      }
    }
  }
);

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(db.seats.filter(t => t.id === parseInt(req.params.id),), 1);

  res.json(confirm);
});

module.exports = router;
