const Testimonial = require('../models/Testimonials.model');

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
    const tes = await Testimonial.find();
    if(!tes) {
      messageNotFound(res);
    } else {
      res.json(tes);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.getById = async (req, res) => {

  try {
    const tes = await Testimonial.findById(req.params.id);
    if(!tes) {
      messageNotFound(res);
    } else {
      res.json(tes);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.post = async (req, res) => {
  const { author, text } = req.body;

  try {
    const newTestimonial = new Testimonial({
      author: author,
      text: text,
    });

    await newTestimonial.save();
    messageOk(res);
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;

  try {
    const tes = await Testimonial.findById(req.params.id);
    if(!tes){
      messageNotFound(res);
    } else {
      tes.author = author;
      tes.text = text;

      await tes.save();
      messageOk(res);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};

exports.delete = async (req, res) => {

  try {
    const tes = await Testimonial.findById(req.params.id);
    if(!tes) {
      messageNotFound(res);
    } else {
      await Testimonial.deleteOne({ _id: req.params.id });
      messageOk(res);
    }
  }
  catch(err) {
    messageError(res, err);
  }
};
