const router = require('express').Router();

const  htmlRouter = require('./htmlRoutes')
const notesRouter = require('./htmlRoutes/note')

router.use('/notes', notesRouter)
router.use('/', htmlRouter)

module.exports = router 