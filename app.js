const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const logger = require('morgan');

//IMPORT ROUTES
const indexRouter = require('./routes/index');		//use erm in index.js


//MIDDLEWARES - Functions that have access to all the req and res objects
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Testing Route - home route
app.get('/', (req, res) => {
  res.send('Hello Lekky Jay.!');
});

const config = {
  dbHost: 'localhost',
  dbName: 'appointments-app',
  dbCollection: 'appointments'
}


MongoClient.connect(process.env.MONGODB_URI || `mongodb://${config.dbHost}`, {
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

app.use('/', indexRouter);
//Add other routers here

app.listen(3000, () => {
  console.log('Server listening on port 3000');
  
});