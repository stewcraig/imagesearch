const mongoose = require('mongoose');

const { Schema } = mongoose;

const historySchema = new Schema({
  term: String,
  when: Date,
});

const History = mongoose.model('History', historySchema);

module.exports = History;
