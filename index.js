const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTokopediaSearch(query) {
  const response = await axios.get(`https://www.tokopedia.com/search?q=${query}`);
  const html = response.data;
  const $ = cheerio.load(html);
  const results = [];

  // Get product data from search results
  $('.pcv3__container .css-1g20a2m').each((i, element) => {
    const productTitle = $(element).find('.css-1bjwylw').text().trim();
    const productPrice = $(element).find('.css-rhd610').text().trim();
    const productImage = $(element).find('.css-1h8mqrk img').attr('src');
    const productLink = $(element).find('.css-1bjwylw').attr('href');
    results.push({ productTitle, productPrice, productImage, productLink });
  });

  return results;
}

// Example usage
scrapeTokopediaSearch('laptop')
  .then(results => console.log(results))
  .catch(err => console.error(err));
