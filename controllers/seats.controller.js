const Seat = require('../models/seats.model');

const messageOk = ( res ) => { 
  return res.json({ message: 'OK' });
};

const messageNotFound = ( res ) => { 
  return res.status(404).json({ message: 'Not found...' });
};

const messageError = ( res, err ) => {
  return res.status(500).json({ message: err });
};

exports.getAll = async (req, res) => {

  try {
    const sea = await Seat.find();
    if(!sea) {
      messageNotFound(res);
    } else {
      res.json(sea);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.getById = async (req, res) => {

  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) {
      messageNotFound(res);
    } else {
      res.json(sea);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.post = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });

    await newSeat.save();
    messageOk(res);
    console.log(newSeat);
    req.io.emit('seatsUpdated', ( await Seat.find()));

  }
  catch(err) {
    messageError(res, err);
  }
};
exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea){
      messageNotFound(res);
    } else {
      sea.day = day;
      sea.seat = seat;
      sea.client = client;
      sea.email = email;
      
      await sea.save();
      messageOk(res);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.delete = async (req, res) => {

  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) {
      messageNotFound(res);
    } else {
      await Seat.deleteOne({ _id: req.params.id });
      messageOk(res);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};
