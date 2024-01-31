const router = require('express').Router();
// gets router files for html and notes page
const apiRouter = require('./apiRoutes')
const  htmlRouter = require('./htmlRoutes')
const notesRouter = require('./htmlRoutes/note')
// uses the routes and requests for each route to handle relevant http requests
router.use('/api', apiRouter)
router.use('/notes', notesRouter)
router.use('/', htmlRouter)

module.exports = router 