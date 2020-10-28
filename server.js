const express = require('express');
const cors = require('cors');
const randomID = require('@bosiu/id-generator');

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Micke Doe', text: 'They really know how to make you happy.' },
  { id: 4, author: 'Tom Doe', text: 'They really know how to make you happy.' },
  { id: 5, author: 'Hanna Doe', text: 'They really know how to make you happy.' },

];

const confirm = { message: 'OK' };
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/testimonials', (req, res) => {
  res.json( db );
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter(t => t.id ===  parseInt(req.params.id)));
});

app.post('/testimonials', (req, res) => {
  db.push({ 
    id: randomID(10), 
    author: req.body.author, 
    text: req.body.text,
  });

  res.json(confirm);
});

app.put('/testimonials/:id', (req, res) => {
  for(let i = 0; i < db.length; i++){
    if(db[i].id === parseInt(req.params.id)){
      db[i].author = req.body.author;
      db[i].text = req.body.text,
      
      res.json(confirm);
      } else {
        res.json({message: 'Data with this id doesnt exists'})
      }
    }
  }
);

app.delete('/testimonials/:id', (req, res) => {
  db.splice(db.filter(t => t.id === parseInt(req.params.id),), 1);

  res.json(confirm);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' }); 
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});