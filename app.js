const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const logger = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

//IMPORT ROUTES
const indexRouter = require('./routes/index');		//use erm in index.js


//MIDDLEWARES - Functions that have access to all the req and res objects
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors is needed to prevent any error when we are sending network request
app.use(cors());

const config = {
  dbHost: 'localhost',
  dbName: 'appointments-app',
  dbCollection: 'appointments'
}

MongoClient.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(client => {
  const db = client.db(config.dbName);
  const collection = db.collection(config.dbCollection);
  app.locals[config.dbCollection] = collection;
  console.log('MongoClient connected');
})

app.use((req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  req.collection = collection;
  next();
})

//Add other routers here
app.use('/', indexRouter);


//Set static files for server
app.use(express.static(path.join(__dirname, 'app', 'dist', 'app')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app',  'dist', 'app', 'index.html'))
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
});