const express = require('express');
const imageApi = require('../models/imageapi');
const searchHistory = require('../models/searchhistory');

const router = express.Router();

function filterResults(array) {
  // Convert Google API search info into URL, snippet, thumbnail and context info only
  return array.map((item) => {
    return {
      url: item.link,
      snippet: item.snippet,
      thumbnail: item.image.thumbnailLink,
      context: item.image.contextLink,
    };
  });
}

router.get('/api/:search', (req, res) => {
  const { search } = req.params;
  // Offset rounded to nearest integer (or set to 1 if 0 or less)
  const offset = Math.round(req.query.offset) > 0 ? Math.round(req.query.offset) : 1;

  async function runSearch() {
    try {
      // Call function to run Google API image search
      const imageData = await imageApi.imageSearch(search, offset);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(filterResults(imageData.data.items), null, 2));
      searchHistory.saveHistory(search);
    } catch (error) {
      console.log(error);
      res.end(JSON.stringify({ Error: 'Could not get search information. Please try again later.' }), null, 2);
    }
  }
  runSearch();
});

router.get('/latest', (req, res) => {
  searchHistory.getHistory((err, history) => {
    if (err) throw err;
    res.end(JSON.stringify(history, null, 2));
  });
});

module.exports = router;
