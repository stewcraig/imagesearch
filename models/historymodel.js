const mongoose = require('mongoose');

const { Schema } = mongoose;

// Set up schema for storing search history
const historySchema = new Schema({
  term: String,
  when: Date,
});

const History = mongoose.model('History', historySchema);

module.exports = History;
