const notesRouter = require('express').Router()
const path = require('path');

notesRouter.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../../public/notes.html'))
);


module.exports = notesRouter