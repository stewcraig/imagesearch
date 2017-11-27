
const History = require('./historymodel');

exports.saveHistory = (searchTerm) => {
  // Create new entry for database
  const newHistory = new History({
    term: searchTerm,
    when: new Date().toString(),
  });

  // Save new entry to database
  newHistory.save((err) => {
    if (err) throw err;
  });
};

exports.getHistory = (numResults, callback) => {
  // Query database for most recent search terms
  const query = History
    .find({}, {}, { sort: { when: -1 } })
    .limit(numResults)
    .exec(callback);
  return query;
};
