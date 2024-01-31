const express = require('express')
const PORT = process.env.PORT || 3001
const routes = require('./routes/index')
const apiRoutes = require('./routes/apiRoutes/index')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// api routes and html routes
app.use('/api/notes', apiRoutes)
app.use(routes)

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
