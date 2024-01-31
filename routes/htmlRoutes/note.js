const notesRouter = require('express').Router()
const path = require('path');
// get request for notes html page
notesRouter.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../../public/notes.html'))
);


module.exports = notesRouter