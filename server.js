const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' }); 
});

const dbAdress = process.env.NODE_ENV === 'production' ? 'mongodb+srv://admin:KB9XIOrQuNKzFElc@tomscluster0.mexej.mongodb.net/NewWaveDB?retryWrites=true&w=majority' : 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect( dbAdress, { useNewUrlParser: true, useUnifiedTopology: true } );
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New socket!');
});

app.use((req, res) => {
  res.status(404).send({message: 'Not found...'});
});