const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('develop/public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/develop/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/develop/db/db.json'))
);

app.post('/api/notes', (req, res) => {

  const { title, text } = req.body;

    const addNote = {
      title,
      text,
      id: uuid.v4()
    };

  let db = fs.readFileSync('develop/db/db.json');
  let parse = JSON.parse(db);

  parse.push(addNote);

  fs.writeFileSync('develop/db/db.json', JSON.stringify(parse));

});




app.listen(PORT, () =>
  console.info(`App listening at http://localhost:${PORT}`)
);