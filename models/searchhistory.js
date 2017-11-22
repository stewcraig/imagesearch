
const History = require('./historymodel');
// const mongoose = require('mongoose');

exports.saveHistory = (searchTerm) => {
  const newHistory = new History({
    term: searchTerm,
    when: new Date().toString(),
  });

  newHistory.save((err) => {
    if (err) throw err;
    console.log('Saved');
  });
};

exports.getHistory = (callback) => {
  return History.find({}, callback);
};
