require('./environments/config');
var express = require('express');
const path = require('path')
const cors = require('cors');

const { initMongoConnection } = require('./modals/mongo_connection');
const bodyParser = require('body-parser');
var app = express();


// spinning up mongoose connection
require('dotenv').config();
initMongoConnection();

// linking the config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist/")));
app.use(cors(
  {
  Access_Control_Allow_Origin: "*",
  origin: "*",
  "Content-Type": "application/javascript;charset=utf-8",
  method:['GET','POST','PATCH','DELETE','PUT'],
  allowedHeaders:'Content-Type, Authorization, Origin, X-Requested-With, Accept'
  }
)); 

// attaching all routes
app.use('/kanban', require('./routes/kanban_route'));
app.use('/static', express.static('public',));
app.get('/index.html', (req, res) => {
  res.set('content-type', 'text/plain').sendFile('index.html', { root: path.join(__dirname, 'public/dist/') } )
 })
app.get('/', (req, res) => {
  res.set('content-type', 'text/plain').sendFile('index.html', { root: path.join(__dirname, 'public/dist/') } )

});

app.listen(process.env.PORT, function (err) {
  if (err) console.error(err);
  console.log(`server is listening on http://localhost:${process.env.PORT}`);
});