const Concert = require('../models/concerts.model');

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
    const con = await Concert.find();
    if(!con) {
      messageNotFound(res);
    } else {
      res.json(con);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.getById = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if(!con) {
      messageNotFound(res);
    } else {
      res.json(con);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.post = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    messageOk(res);
  }
  catch(err) {
    messageError(res, err);
  }
};
exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const con = await Concert.findById(req.params.id);
    if(!con){
      messageNotFound(res);
    } else {
      con.performer = performer;
      con.genre = genre;
      con.price = price;
      con.day = day;
      con.image = image;
      await con.save();
      messageOk(res);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.delete = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if(!con) {
      messageNotFound(res);
    } else {
      await Concert.deleteOne({ _id: req.params.id });
      messageOk(res);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};
