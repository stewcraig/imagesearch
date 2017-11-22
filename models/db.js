const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/imagesearch', { useMongoClient: true });

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection err', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

process.on('SIGNT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

// const openDb = (callback) => {
//   const db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error'));
//   db.once('open', callback);
// };
