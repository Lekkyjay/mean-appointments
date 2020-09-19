const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const logger = require('morgan');

const PORT = process.env.PORT || 8080;

//IMPORT ROUTES
const indexRouter = require('./routes/index');		//use erm in index.js


//MIDDLEWARES - Functions that have access to all the req and res objects
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Serve static file - This is mainly for production
// app.use(express.static(path.join(__dirname, 'app', 'dist', 'app')));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'app',  'dist', 'app', 'index.html'))
// })

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

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'app', 'dist', 'app')));
//   app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'app',  'dist', 'app', 'index.html'))
//   })
// } else {
//   app.use(express.static(path.join(__dirname, 'app', 'dist', 'app')));
// }

//Add other routers here
app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
});