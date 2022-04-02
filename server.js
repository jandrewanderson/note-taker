const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
// const dbJson = require('./develop/db/db.json');
const json = fs.readFileSync(path.join(__dirname, '/develop/db/db.json'));
const dbJson = JSON.parse(json);
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('develop/public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/develop/public/index.html'))
);

// GET route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
);

// GET route for the database
app.get('/api/notes', (req, res) => {
  res.json(dbJson);
});

// POST route for the database
app.post('/api/notes', (req, res) => {

  const note = req.body;
  console.log(note);

    const addNote = {
      title: note.title,
      text: note.text,
      id: uuid.v4()
    };

  dbJson.push(addNote);

  writeDbJson();

  return res.json(addNote);

});

// Function to add to the db.json file
const writeDbJson = () => {
  fs.writeFileSync('develop/db/db.json', JSON.stringify(dbJson), err => {
    err ? console.error(err) : console.log('You have added an entry to your database!')
  })
}

// TODO: add Delete function

// Make homepage default
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/develop/public/index.html'))
);

// add PORT listener
app.listen(PORT, () =>
  console.info(`App listening at http://localhost:${PORT}`)
);


