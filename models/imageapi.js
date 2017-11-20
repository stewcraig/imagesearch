require('dotenv').config();
const axios = require('axios');

exports.imageSearch = (search, page) => {
  // Google API settings
  const url = 'https://www.googleapis.com/customsearch/v1';
  const resultsPerPage = 10;
  const options = {
    params: {
      key: process.env.API_KEY,
      cx: '004004470158517339739:b89uwrgkloy',
      searchType: 'image',
      num: resultsPerPage,
      start: `${((page - 1) * resultsPerPage) + 1}`,
      q: search,
    },
  };
  return axios.get(url, options);
};
