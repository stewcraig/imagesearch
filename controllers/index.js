const express = require('express');
const imageApi = require('../models/imageapi');
const searchHistory = require('../models/searchhistory');

const router = express.Router();

function filterResults(array) {
  // Convert results returned from Google search API into only the following fields:
  // URL, snippet, thumbnail and context
  return array.map((item) => {
    const newArray = {
      url: item.link,
      snippet: item.snippet,
      thumbnail: item.image.thumbnailLink,
      context: item.image.contextLink,
    };
    return newArray;
  });
}

// ------------------- /search/:search ROUTE ----------------------
router.get('/search/:search', (req, res) => {
  const { search } = req.params;
  // Offset parameter controls page number of results to display.
  // Round offset to nearest integer (or set to 1 if 0 or less)
  const offset = Math.round(req.query.offset) > 0 ? Math.round(req.query.offset) : 1;

  async function runSearch() {
    try {
      // Call function to run Google API image search
      const imageData = await imageApi.imageSearch(search, offset);
      // Return search results to user
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(filterResults(imageData.data.items), null, 2));
      // Save search result to database
      searchHistory.saveHistory(search);
    } catch (error) {
      // Return error message to user if could not get Google API data
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ Error: 'Could not get search results. Please try again later.' }, null, 2));
    }
  }
  runSearch();
});

// ------------------- /history ROUTE ----------------------
router.get('/history', (req, res) => {
  // Check if number of query specified (if not then default to 10) - max of 100
  let numResults = parseInt(req.query.num, 10) > 0 ? parseInt(req.query.num, 10) : 10;
  numResults = Math.max(numResults, 100);
  // Call function to query database for recent search terms
  searchHistory.getHistory(numResults, (err, history) => {
    if (err) {
      // Return error if cannot find database content
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ Error: 'Could not get access search history.' }, null, 2));
    }
    // Return search history to user
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(history, ['term', 'when'], 2));
  });
});

module.exports = router;
